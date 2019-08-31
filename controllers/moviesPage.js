const movie = require('../database/models/Movies')
const movieShow = require('../database/models/MovieShow')

module.exports = async (req,res) => {
    const Movies = await movie.find({}).sort({releaseDate: -1});
    res.render('movies', {
        Movies
    })
};

