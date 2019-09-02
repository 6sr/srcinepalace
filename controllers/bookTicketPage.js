const userBooking = require('../database/models/UserBookings')

module.exports = async (req,res) => {
    // Getting movie show id from form
    const showId = req.body.movieshow_id

    // Forming array of seats
    var loopSeatNum = []
    for(var i = 0;i < 100;i++) {
        loopSeatNum.push(i);
    }

    // Marking seats which are already booked
    var alreadyBooked = []
    
    // Extracting bookings for partiular movie show
    var seatList = await userBooking.find({movieshow_id: showId})
    for(var i in seatList) {
        var curr = seatList[i].seats.map(function(item) {
            return parseInt(item);
        });
        // Combining two arrays
        alreadyBooked = alreadyBooked.concat(curr)
    }
    // Passing variabls to edge template
    res.render('bookTicket', {
        showId,
        loopSeatNum,
        alreadyBooked
    })
};

