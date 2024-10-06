
const { Participant } = require('../models/participantSchema');

const getParticipantByEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const participants = await Participant.find({ eventId: eventId });
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getParticipantByEvent,
}; 