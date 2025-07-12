const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes');
const { createClient } = require('redis');

const app = express();
dotenv.config({ path: './.env' });

app.use(express.json());

app.use(cors({
  origin: 'https://gdg-sync.vercel.app',
  credentials: true
}));

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    try {
        await redisClient.connect();
        console.log("Redis connected");
    } catch (err) {
        console.error("Redis connection failed:", err);
    }
})();

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/events', eventRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

try {
    const connect = async () => {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    };
    connect();
} catch (err) {
    console.log(err.message);
}

app.get('/', (req, res) => {
    res.status(200).json("hello world");
});

module.exports = app;
