
const { Event } = require('../models/eventSchema');
const { Participant } = require('../models/participantSchema');

const getParticipantByEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found' });
        }
        const participants = await Participant.find({ eventId: eventId });
        res.status(200).json({message:'Fetched successfully',participants});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const applyEvent = async (req, res) => {
    try {
        const eventId = req.params.id; 
        const userId = req.user.id;
        const username = req.user.username;
        
        const participant = await Participant.findOne({ eventId, userId, username });
        if (participant) {
            return res.status(400).json({ error: true, message: 'Already applied for the event' });
        }

        const newParticipant = await Participant.create({ eventId, userId, username });
        
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found' });
        }

        event.participants.push({ id: userId, username: username });
        await event.save();

        res.status(200).json({ message: 'Enrolled successfully', participant: newParticipant });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UnApplyEvent = async (req,res)=>{
    try{
        const eventId = req.params.id;
        const userId = req.user.id;
        const username = req.user.username;

        const participant = await Participant.findOne({ eventId, userId, username });
        if (!participant) {
            return res.status(400).json({ error: true, message: 'Not applied for the event' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found' });
        }

        event.participants = event.participants.filter(participant => participant.id !== userId);
        await event.save();

        await Participant.findOneAndDelete({ eventId, userId, username });

        res.status(200).json({ message: 'Unenrolled successfully' });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const getEventsByParticipant = async(req,res)=>{
    try{
        const userId = req.user.id;
        const username = req.user.username;
        const participants = await Participant.find({userId,username});
        const events = await Promise.all(participants.map(participant => Event.findById(participant.eventId)));
        if(!events){
            return res.status(404).json({error:true,message:'No events found' });
        }
    
        res.status(200).json({message:'Fetched successfully',events});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const getEnrollmentStatusByevent = async(req,res)=>{
    try{
        const eventId = req.params.id;
        const userId = req.user.id;
        const username = req.user.username;
        const participant = await Participant.findOne({eventId,userId,username});
        if(!participant){
            return res.status(200).json({message:'Not enrolled',enrolled:false});
        }
        res.status(200).json({message:'Enrolled',enrolled:true});
    }catch(err){
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getParticipantByEvent,applyEvent,UnApplyEvent,getEventsByParticipant ,getEnrollmentStatusByevent
}; 