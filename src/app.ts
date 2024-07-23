import express from 'express';
import mongoose from 'mongoose';
import gameRoutes from './routes/gameRoutes';
import roundRoutes from './routes/roundRoutes';

const app = express();

app.use(express.json());
app.use('/api/games', gameRoutes);
app.use('/api/rounds', roundRoutes);

mongoose.connect('mongodb://localhost:27017/tic-tac-toe');

export default app;
