const movie = require('../database/models/Movies')
const movieShow = require('../database/models/MovieShow')

module.exports = async (req,res) => {
    // Extracting movies
    const movies = await movie.find({}).sort({releaseDate: -1});

    // Extracting movies which are not released
    const comingSoonMovies = await movie.find({releaseDate : { $gte : new Date() }});

    // Extracting movies which are released and still shown in halls
    const nowShowingMovies = [];
    // Gets released movies
    const releasedMovies = await movie.find({releaseDate : { $lte : new Date() }});
    for(var i in releasedMovies) {
        var query = [
            {
                start_time : { $gte : new Date() }
            },
            {
                movie_id : releasedMovies[i]._id
            }
        ]
        // Gets movies which are still shown in halls
        var curr = await movieShow.find({"$and" : query})
        if(curr) {
            for(var j in curr) {
                if(curr[j]) {
                    nowShowingMovies.push(releasedMovies[i])
                    break
                }
            }
        }
    }
    // Passing variabls to edge template
    res.render('index', {
        movies,
        nowShowingMovies, 
        comingSoonMovies
    })
};

