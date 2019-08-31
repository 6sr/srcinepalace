const movie = require('../database/models/Movies')
const movieShow = require('../database/models/MovieShow')

module.exports = async (req,res) => {
    const movies = await movie.find({}).sort({releaseDate: -1});
    const comingSoonMovies = await movie.find({releaseDate : { $gte : new Date() }});

    const nowShowingMovies = [];
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
    res.render('index', {
        movies,
        nowShowingMovies, 
        comingSoonMovies
    })
};

