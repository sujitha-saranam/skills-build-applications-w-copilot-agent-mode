import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res) => {
  const entries = await LeaderboardEntry.find().sort({ rank: 1 });
  res.json(entries);
});

router.get('/:id', async (req, res) => {
  const entry = await LeaderboardEntry.findById(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.json(entry);
});

router.post('/', async (req, res) => {
  const entry = new LeaderboardEntry(req.body);
  await entry.save();
  res.status(201).json(entry);
});

router.put('/:id', async (req, res) => {
  const entry = await LeaderboardEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.json(entry);
});

router.delete('/:id', async (req, res) => {
  const entry = await LeaderboardEntry.findByIdAndDelete(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.status(204).send();
});

export default router;
