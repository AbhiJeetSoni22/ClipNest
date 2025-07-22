import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import fileRoutes from './routes/files.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';


dotenv.config();
connectDB();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors(
    {
        origin: ['http://localhost:5173','https://clip-nest-sigma.vercel.app/'],
        credentials: true,
    }
))
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));