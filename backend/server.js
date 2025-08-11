import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import connectMongoDB from './config/mongodb.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import courseRoutes from './routes/instructor.route.js';

const app = express();

// Connect to MongoDB
await connectMongoDB();

// Allow frontend requests
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);

const PORT = process.env.PORT || 3000;

// Deployment setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.resolve(__dirname, '../frontend/dist');

  // ✅ Serve only if the path exists
  app.use(express.static(frontendPath));

  // ✅ Catch-all for non-API routes
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
