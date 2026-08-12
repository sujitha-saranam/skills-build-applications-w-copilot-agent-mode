import express from 'express';
import db, { connectDB } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import workoutsRouter from './routes/workouts';
import leaderboardRouter from './routes/leaderboard';

const app = express();
const port = Number(process.env.PORT || 8000);

// Codespaces-aware base URL (fallback to localhost)
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

// Simple CORS middleware that allows requests from the computed baseUrl and localhost
app.use((req, res, next) => {
  const origin = req.get('origin');
  const allowedOrigins = [baseUrl, `http://localhost:${port}`, `http://127.0.0.1:${port}`];
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', baseUrl);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

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
    console.log(`API base URL: ${baseUrl}`);
  });
});
