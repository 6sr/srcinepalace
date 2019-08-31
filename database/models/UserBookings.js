const mongoose = require('mongoose')

const UserBookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieshow_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MovieShow',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bookedAt: {
        type: Date,
        default: new Date(),
        required: true
    },
    seats: {
        type: Array,
        required: true
    }
})

// Exporting UserBooking Schema
const UserBooking = mongoose.model('UserBooking',UserBookingSchema)

module.exports = UserBooking

