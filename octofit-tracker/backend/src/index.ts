import express from 'express';
import db, { connectDB } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import workoutsRouter from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Welcome to the OctoFit Tracker API' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'OctoFit Tracker API' });
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on http://localhost:${port}`);
  });
});
