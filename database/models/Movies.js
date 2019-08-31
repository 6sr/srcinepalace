const mongoose = require('mongoose')

const MoviesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        default: new Date(),
        required: true
    },
    lengthMinutes: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    posterImage: String,
    language: String
})

// Exporting Movies Schema
const Movies = mongoose.model('Movies',MoviesSchema)

module.exports = Movies

