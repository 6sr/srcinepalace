const movie = require('../database/models/Movies')
const movieShow = require('../database/models/MovieShow')
const cinemaHall = require('../database/models/CinemaHalls')

module.exports = async (req,res) => {
    const movieId = req.params.id
    const oneMovie = await movie.findById(movieId)

    const shows = await movieShow.find({movie_id: movieId}).sort({start_time: 1})

    var CinemaHalls = []
    for(var i in shows) {
        var curr = await cinemaHall.findById(shows[i].hall_id)
        if(curr) {
            CinemaHalls.push(curr)
            // console.log(curr.name)
        }
    }

    // console.log(req.params)
    res.render('moviesById', {
        oneMovie,
        shows,
        CinemaHalls
    })
};

