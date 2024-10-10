
const { Event } = require('../models/eventSchema');
const { Participant } = require('../models/participantSchema');

const getParticipantByEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const participants = await Participant.find({ eventId: eventId });
        res.status(200).json({message:'Fetched successfully',participants});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const applyEvent = async(req,res) =>{
    try{
        const eventId  = req.params.id; 
        console.log(eventId)
        const participant = await Participant.findOne({eventId,userId:req.user.id,username:req.user.username});
        if(participant){
            return res.status(400).json({error:true,message:'Already applied for the event'});
        }
        const newparticipant = await Participant.create({eventId,userId:req.user.id,username:req.user.username});
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found' });
        }
        event.participants.push({ id: userId, username: username });
        await event.save();
        res.status(200).json({message:'Enrolled successfully',participant:newparticipant});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getParticipantByEvent,applyEvent
}; 