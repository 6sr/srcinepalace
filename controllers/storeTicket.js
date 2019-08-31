const cinemaHall = require('../database/models/CinemaHalls')
const movies = require('../database/models/Movies')
const movieShow = require('../database/models/MovieShow')
const user = require('../database/models/User')
const userBooking = require('../database/models/UserBookings')

const request = require('request')
const fs = require('fs')

module.exports = (req,res) => {
    var bookingObj = req.body;
    bookingObj["user_id"] = req.session.userId;

    // Calculating price of tickets
    var seatArray = bookingObj["seats"];
    var price = 100
    for(var i = 0;i < seatArray.length;i++) {
        var curr = Math.trunc((seatArray[i] - 1) / 20) + 1;
        price += curr * 100;
    }
    bookingObj["price"] = price;
    
    // Storing ticket details in database
    userBooking.create(req.body, (error, user) => {
        if(error) {
            return res.redirect('/movies')
        }
        writeToPDF(user, () => {
            res.redirect(`/Tickets/${user._id}.pdf`);
        });
    })
};

const writeToPDF = async (bookingObj, redirectCallback) => {
    const User = await user.findById(bookingObj.user_id)
    const MovieShow = await movieShow.findById(bookingObj.movieshow_id)
    const Movie = await movies.findById(MovieShow.movie_id)
    const CinemaHall = await cinemaHall.findById(MovieShow.hall_id)
    var startTime = MovieShow.start_time.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                    + "  " + MovieShow.start_time.toLocaleTimeString();
    var bookTime = bookingObj.bookedAt.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                    + "  " + bookingObj.bookedAt.toLocaleTimeString();

    var htmlStr = `
        <html>
            <body style="border: 5px solid black; padding: 15px;">
                <center>
                <h1>Cine Palace</h1>
                </center>
                <hr>
                <h3>User Details</h3>
                    Name : ${User.username}<br>
                    Mail Id : ${User.email}<br>
                <h3>Movie Details</h3>
                    Name : ${Movie.name}<br>
                    Language : ${Movie.language}<br>
                <h3>Cinema Hall Details</h3>
                    Name : ${CinemaHall.name}<br>
                    Address : <Address>${CinemaHall.address}</Address>
                <h3>Show Details</h3>
                    Type of Show : ${MovieShow.type_of_show}<br>
                    Start Time : ${startTime}<br>
                <h3>Booking Details</h3>
                    Booked At : ${bookTime}<br>
                    Price : ${bookingObj.price} INR<br>
                    Seat Number : ${bookingObj.seats}<br>
            </body>
        </html>
    `;

    request.post(
        'https://api.pdfshift.io/v2/convert/',
        {
            'auth': {'user': process.env.PDF_SHIFT_API_KEY},
            'json': {'source': htmlStr},
            'encoding': null
        },
        (error, response, body) => {
            if (response === undefined) {
                return reject({'message': 'Invalid response from the server.', 'code': 0, 'response': response})
            }
            if (response.statusCode == 200) {
                // Do what you want with `body`, that contains the binary PDF
                // Like returning it to the client - or saving it as a file locally or on AWS S3
                // console.log(body)
                var filePath = `${__dirname}\\..\\public\\Tickets\\${bookingObj._id}.pdf`
                fs.writeFileSync(filePath, body,'binary');
                redirectCallback();
                return true
            }
    
            // Handle any errors that might have occured
        }
    );
}


