const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique : true,
        index: true
    },
    role: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    created_at: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      }
})

module.exports = mongoose.model('User', dataSchema)