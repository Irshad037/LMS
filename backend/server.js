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
import { stripeWebhooks } from './controllers/webhooks.js';

const app = express();

// Connect to MongoDB
await connectMongoDB();





// ✅ Allow both dev & prod frontend URLs
const allowedOrigins = [
  process.env.FRONTEND_DEV_URL || 'http://localhost:5173',
  process.env.FRONTEND_PROD_URL || 'https://learnify-m8wq.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests without origin (mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);

const PORT = process.env.PORT || 3000;

// ---------- Deployment setup ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  // Serve index.html for non-API routes
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}
// ---------------------------------------

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
