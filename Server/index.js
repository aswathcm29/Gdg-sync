const express = require('express')
const cors = require('cors') 
const bodyParser = require('body-parser');
const mongoose = require("mongoose")


const dotenv = require('dotenv');

const app = express();


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


dotenv.config({ path: './.env' });

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})

try{
    const connect = async() =>{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected")   
    }
    connect();
}
catch(err){
    console.log(err.message)
}

app.get('/',(req, res)=>{
    res.status(200).json("hello world")
})




