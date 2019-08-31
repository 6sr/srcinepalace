const movie = require('../database/models/Movies')

module.exports = async (req,res) => {
    // const Movies = await movie.find({releaseDate : { $lte : new Date() }});
    const Movies = await movie.find({releaseDate : { $gte : new Date() }});

    res.render('comingSoon', {
        Movies
    })
};

