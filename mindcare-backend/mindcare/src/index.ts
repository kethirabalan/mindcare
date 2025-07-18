import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';
import moodRoutes from './routes/moodRoutes';
import journalRoutes from './routes/journalRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/moods', moodRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/journals', journalRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mindcare';

mongoose.connect(MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.use('/api/auth', authRoutes);
