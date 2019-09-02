const mongoose = require('mongoose')

const UserBookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Could not book your ticket'],
    },
    movieshow_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MovieShow',
        required: [true, 'Could not book your ticket'],
    },
    price: {
        type: Number,
        required: [true, 'Could not book your ticket'],
    },
    bookedAt: {
        type: Date,
        default: new Date(),
        required: [true, 'Could not book your ticket'],
    },
    seats: {
        type: Array,
        required: [true, 'Could not book your ticket'],
    }
})

// Exporting UserBooking Schema
const UserBooking = mongoose.model('UserBooking',UserBookingSchema)

module.exports = UserBooking

