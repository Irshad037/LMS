import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectMongoDB from './config/mongodb.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import courseRoutes from './routes/instructor.route.js';

const app = express();

// Connect to MongoDB
await connectMongoDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '30mb' }));// For application/json
app.use(express.urlencoded({ limit: '30mb', extended: true }));// For x-www-form-urlencoded
app.use(cookieParser());  // ✅ Use cookie-parser middleware

app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/course',courseRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

