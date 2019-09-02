const cinemaHall = require('../database/models/CinemaHalls')

module.exports = async (req,res) => {
    // Extracting all cinema halls from db and sort accccording to name
    const CinemaHalls = await cinemaHall.find({}).sort({name: 1});
    res.render('cinemaHalls', {
        CinemaHalls
    })
};

