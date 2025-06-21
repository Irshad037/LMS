import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectMongoDB from './config/mongodb.js';

const app = express();

// Connect to MongoDB
await connectMongoDB();

app.use(cors());

app.get('/',(req,res)=> res.send("api working"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})

