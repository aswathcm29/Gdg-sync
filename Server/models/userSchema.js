const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique:true
    },
    password : {
        type : String,
        required : true
    },
    contactno:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum: ['anonymous','admin', 'user'], 
        default:'anonymous'
    }

},
{
    timestamps : true
})


const User = mongoose.model('user', userSchema)
module.exports = {User};