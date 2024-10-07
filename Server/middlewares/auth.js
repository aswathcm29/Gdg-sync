const jwt = require('jsonwebtoken')

const {User} = require('../models/userSchema');

const checkUser = async(req,res,next) =>{
    try{
      if(!req.headers.authorization){
            return res.status(401).json({error:true,message:'Unauthorized'})
      }
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,process.env.SECRET,async(err,user)=>{
            if(err){
                return res.status(401).json({error:true,message:'Unauthorized'})
            }
            const doc = await User.findOne({email:user.email});
            if(!doc){
                return res.status(401).json({error:true,message:'Unauthorized'})
            }
            req.user = {username : doc.username , id: doc._id,email:doc.email,role:doc.role};
            next();
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({error:true,message:err.message})
    }
}

module.exports = {checkUser}