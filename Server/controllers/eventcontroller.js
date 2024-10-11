const {Event}  = require('../models/eventSchema');
const { User } = require('../models/userSchema');



const createEvent = async (req,res)=>{
    try{
        const {title,description,date,time,location,image,tags} = req.body;
        if(req.user.role!='admin'){
            return res.status(400).json({error:true,message:'Unauthorized'})
        }
        if(!title || !description || !date || !time || !location || !tags){
            return res.status(400).json({error:true,message:'Enter all fields'})
        }
        const checkEvent = await Event.findOne({title});
        if(checkEvent){
            return res.status(400).json({error:true,message:'Event already exists'})
        }
        const event = await Event.create({
            title,
            description,
            date,
            time,
            location,
            image,
            tags,   
            organiser : req.user.email
        })
        return res.status(200).json({error:false,message:'Event created successfully',event})
    }catch(err){
        console.log(err.message)
        return res.status(400).json({error:true,message:err.message})
    }
}


const getEvents = async(req,res)=>{
    try{
        const events = await Event.find();
        return res.status(200).json({error:false,message:'Events fetched successfully',events})
    }catch(err){
        console.log(err.message)
        return res.status(400).json({error:true,message:err.message})
    }
}

const getEvent = async(req,res)=>{
    try{
        const event = await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({error:true,message:'Event not found'})
        }
        return res.status(200).json({error:false,message:'Event fetched successfully',event})
    }catch(err){
        console.log(err.message)
        return res.status(400).json({error:true,message:err.message})
    }
}

const updateEvent = async(req,res)=>{
    try{
        const event = await Event.findByIdAndUpdate
        (req.params.id,req.body,{new:true});
        return res.status(200).json({error:false,message:'Event updated successfully',event})
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json({error:true,message:err.message})
    }
}

const deleteEvent = async(req,res)=>{
    try{
        const event = await Event.findByIdAndDelete(req.params.id);
        return res.status(200).json({error:false,message:'Event deleted successfully',event})
    }catch(err){
        console.log(err.message)
        return res.status(400).json({error:true,message:err.message})
    }
}

const getEventsbyUser = async (req, res) => {
    try {
        const email = req.body.email;
        const events = await Event.find({ organiser: email });
        return res.status(200).json({ error: false, message: 'Events fetched successfully', events });
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ error: true, message: err.message });
    }
};

const updateStatus = async(req,res)=>{
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['upcoming', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ error: true, message: 'Invalid status' });
        }
        const event = await Event.findByIdAndUpdate(id, { status }, { new: true });
        if (!event) {
            return res.status(404).json({ error: true, message: 'Event not found' });
        }
        return res.status(200).json({ error: false, message: 'Status updated successfully', event });
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ error: true, message: err.message });
    }
} 


module.exports = {createEvent,getEvents,getEvent,updateEvent,deleteEvent,getEventsbyUser}