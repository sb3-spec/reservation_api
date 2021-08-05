const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reservationDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    partySize: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Reservation', reservationSchema)