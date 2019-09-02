const movie = require('../database/models/Movies')

module.exports = async (req,res) => {
    // Extracting movies which are not released
    const Movies = await movie.find({releaseDate : { $gte : new Date() }});

    res.render('comingSoon', {
        Movies
    })
};

