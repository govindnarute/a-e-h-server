const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String,
    },
    middleName: {
        required: true,
        type: String,
    },
    lastName: {
        required: true,
        type: String,
    },
    address: {
        required: true,
        type: String
    },
    batchStartDate: {
        required: true,
        type: Date
    },
    batchEndDate: {
        required: true,
        type: Date
    },
    batchTime: {
        required: true,
        type: String
    },
    totalFee: {
        required: true,
        type: Number
    },
    professionalSummery: {
        required: true,
        type: String
    },
    isFeePaid: {
        required: true,
        type: Boolean
    },
    feeDetails:[{
        mode:String,
        amount:Number
    }],
    created_at: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      }
})

module.exports = mongoose.model('Student', dataSchema)