const movie = require('../database/models/Movies')
const movieShow = require('../database/models/MovieShow')

// Extracting movies which are released and still shown in halls
module.exports = async (req,res) => {
    // Gets released movies
    const releasedMovies = await movie.find({releaseDate : { $lte : new Date() }});
    var Movies = []
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
                    Movies.push(releasedMovies[i])
                    break
                }
            }
        }
    }
    // Passing variabls to edge template
    res.render('nowShowing', {
        Movies
    })
};
