import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';  // Your MongoDB connection file
import authRoutes from './routes/auth.js';     // Auth routes you created

dotenv.config();
await connectDB();

const app = express();

app.use(express.json());

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Optional health check endpoint
app.get('/health', (req, res) => res.send('OK'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
