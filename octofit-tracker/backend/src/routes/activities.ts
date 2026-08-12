import { Router } from 'express';
import Activity from '../models/Activity';
import User from '../models/User';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user team');
  res.json(activities);
});

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('user team');
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json(activity);
});

router.post('/', async (req, res) => {
  const { user: userId, team: teamId, type, durationMinutes, caloriesBurned, distanceKm, date } = req.body;
  const activity = new Activity({ user: userId, team: teamId, type, durationMinutes, caloriesBurned, distanceKm, date });
  await activity.save();

  if (userId) {
    await User.findByIdAndUpdate(userId, { $inc: { points: Math.floor(caloriesBurned / 10) } });
  }

  if (teamId) {
    await Team.findByIdAndUpdate(teamId, { $inc: { points: Math.floor(caloriesBurned / 10) } });
  }

  res.status(201).json(activity);
});

router.put('/:id', async (req, res) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json(activity);
});

router.delete('/:id', async (req, res) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.status(204).send();
});

export default router;
