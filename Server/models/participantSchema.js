const mongoose = require('mongoose')

const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    }
})

const Participant = mongoose.model('participant', participantSchema)
module.exports = {Participant};