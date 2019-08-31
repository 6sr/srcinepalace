const cinemaHall = require('../database/models/CinemaHalls')
const movie = require('../database/models/Movies')

module.exports = async (req,res) => {
    const searchQuery = req.query.searchQuery
    const cinemaHallsQuery = [
        {
            name : new RegExp(searchQuery, 'i')
        },
        {
            address : new RegExp(searchQuery, 'i')
        }
    ]
    const moviesQuery = [
        {
            name : new RegExp(searchQuery, 'i')
        },
        {
            description : new RegExp(searchQuery, 'i')
        },
        {
            director : new RegExp(searchQuery, 'i')
        },
        {
            language : new RegExp(searchQuery, 'i')
        }
    ]
    const CinemaHalls = await cinemaHall.find({"$or": cinemaHallsQuery}).sort({name: 1});
    const Movies = await movie.find({"$or": moviesQuery}).sort({name: 1});
    res.render('search', {
        searchQuery,
        CinemaHalls,
        Movies
    })
};

