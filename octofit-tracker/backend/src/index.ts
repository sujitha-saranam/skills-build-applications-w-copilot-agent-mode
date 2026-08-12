import express from 'express';
import db from './config/database';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Welcome to the OctoFit Tracker API' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'OctoFit Tracker API' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on http://localhost:${port}`);
});
