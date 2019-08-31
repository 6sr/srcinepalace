const mongoose = require('mongoose')

const MovieShowSchema = new mongoose.Schema({
    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies',
        required: true
    },
    hall_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CinemaHalls',
        required: true
    },
    type_of_show: {
        type: String
    },
    start_time: {
        type: Date,
        default: new Date(),
        required: true
    }
})

// Exporting MovieShow Schema
const MovieShow = mongoose.model('MovieShow',MovieShowSchema)

module.exports = MovieShow

