const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config('./env')
const secret = process.env.SECRET;

const generateToken = (email,role,username)=>{
    try{
        const token = jwt.sign(
            {email,role,username},
             secret,
            {expiresIn:'7d'}
        )
        return token;
    }catch(err){
        console.error(err.message)
        return "";
    }
}
module.exports={generateToken}