const mongoose = require('mongoose')

const CinemaHallsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    Image: String
})

// Exporting CinemaHalls Schema
const CinemaHalls = mongoose.model('CinemaHalls',CinemaHallsSchema)

module.exports = CinemaHalls

