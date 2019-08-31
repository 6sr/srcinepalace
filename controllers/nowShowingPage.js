const movie = require('../database/models/Movies')
const movieShow = require('../database/models/MovieShow')

module.exports = async (req,res) => {
    const releasedMovies = await movie.find({releaseDate : { $lte : new Date() }});
    var Movies = []
    for(var i in releasedMovies) {
        // console.log(releasedMovies[i]._id)
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
                    Movies.push(releasedMovies[i])
                    break
                }
            }
        }
    }
    // console.log(Movies)
    // Movies = null
    res.render('nowShowing', {
        Movies
    })
};
