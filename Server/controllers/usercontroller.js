const {User} = require('../models/userSchema')
const {Participant} = require('../models/participantSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {generateToken} = require('../utils/helper.service')


const Login =async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:true,message:'enter all fields'})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:true,message:'User does not exist'});
        }
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(400).json({error:true,message:'Invalid password'})
        }
        const token = generateToken(user.email,user.role,user.username)
        if(token==""){
            return res.status(400).json({error:true,message:'Token generation failed'})
        }
        return res.status(200).json({error:false,message:{text:"Logged in successfully",token:token,role:user.role,email:user.email,username:user.username,id:user._id  }})
  }catch(err){
    console.log(err.message)
    return res.status(400).json({error:true , message:err.message})
  }
}


const Signup = async (req, res) => {
    try {
        const {username,email,password,contactno} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: true, message: 'Enter all the details' });
        }

        const user = await User.findOne({
            $or: [{email: email}, {contactno: contactno}]
        });
        if (user) {
            return res.status(400).json({ error: true, message: 'User already exists' });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const doc = await User.create({
            username: username,
            email: email,
            password: hashpassword,
            contactno: contactno,
            role: 'user',
        });

        const token = generateToken(doc.email, doc.role, doc.username);

        return res.status(200).json({
            error: false,
            message: { text: 'User created successfully', token: token, role:'user',email:email,username:username }
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: true, message: err.message });
    }
};

const getUser = (req, res) =>{
    if(!req.user){
        return res.status(400).json({error:true,message:'User not found'})
    }
    try{
        return res.status(200).json({error:false,message:{username: req.user.username,id:req.user.id}})
      }catch(err){
       res.status(400).json({error:true,message:err.message})
      }
}


module.exports = {Login,Signup,getUser}