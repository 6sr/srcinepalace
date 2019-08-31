const userBooking = require('../database/models/UserBookings')

module.exports = async (req,res) => {
    // console.log(req.params)
    // console.log(req.body)
    const showId = req.body.movieshow_id

    var loopSeatNum = []
    for(var i = 0;i < 100;i++) {
        loopSeatNum.push(i);
    }

    var alreadyBooked = []
    var seatList = await userBooking.find({movieshow_id: showId})
    for(var i in seatList) {
        var curr = seatList[i].seats.map(function(item) {
            return parseInt(item);
        });
        alreadyBooked = alreadyBooked.concat(curr)
        // console.log(seatList[i].seats)
        // console.log(alreadyBooked)
    }
    // console.log("Already")
    // console.log(alreadyBooked)
    res.render('bookTicket', {
        showId,
        loopSeatNum,
        alreadyBooked
    })
};

