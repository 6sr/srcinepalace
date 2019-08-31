const cinemaHall = require('../database/models/CinemaHalls')

module.exports = async (req,res) => {
    const CinemaHalls = await cinemaHall.find({}).sort({name: 1});
    res.render('cinemaHalls', {
        CinemaHalls
    })
};

