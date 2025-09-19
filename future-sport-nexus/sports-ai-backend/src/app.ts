// src/app.ts
import express from 'express';
import connectDB from './config/database.ts';  // note the .js extension for ESM resolution
import dotenv from 'dotenv';

dotenv.config();
await connectDB();

const app = express();
app.use(express.json());
app.get('/health', (_, res) => res.send('OK'));

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
