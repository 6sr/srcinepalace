const movie = require('../database/models/Movies')
const movieShow = require('../database/models/MovieShow')
const cinemaHall = require('../database/models/CinemaHalls')

module.exports = async (req,res) => {
    // Getting id of movie from url
    const movieId = req.params.id
    // Getting movie with particular id
    const oneMovie = await movie.findById(movieId)
    // Getting moviee shows  for partiular movie sorted by start time
    const shows = await movieShow.find({movie_id: movieId}).sort({start_time: 1})

    var CinemaHalls = []
    for(var i in shows) {
        // Getting hall details
        var curr = await cinemaHall.findById(shows[i].hall_id)
        if(curr) {
            CinemaHalls.push(curr)
        }
    }

    // Passing variabls to edge template
    res.render('moviesById', {
        oneMovie,
        shows,
        CinemaHalls
    })
};

