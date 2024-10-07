const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required : true
    },
    time: {
        type: String,
        required: true
    },
    image :{
      type : String,
      required : true
    },
    location: {
        type: String,
        required: true
    },
    organiser: {
        type: String,
        required: true
    },
    status :{
        type: String,
        enum: ['upcoming','completed','cancelled'],
        default:'upcoming'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant'
    }],
})

const Event = mongoose.model('event', eventSchema)
module.exports = {Event};
