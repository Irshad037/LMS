import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectMongoDB from './config/mongodb.js';
import authRoutes from './routes/auth.route.js';

const app = express();

// Connect to MongoDB
await connectMongoDB();

app.use(cors());
app.use(express.json()); // For application/json
app.use(express.urlencoded({ extended: true })); // For x-www-form-urlencoded

app.use('/api/auth',authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

