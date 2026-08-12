import { Router } from 'express';
import User from '../models/User';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().populate('team');
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('team');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

router.post('/', async (req, res) => {
  const { username, email, profileImage, team: teamId } = req.body;
  const user = new User({ username, email, profileImage, team: teamId, points: 0 });
  await user.save();

  if (teamId) {
    await Team.findByIdAndUpdate(teamId, { $addToSet: { members: user._id } });
  }

  res.status(201).json(user);
});

router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.team) {
    await Team.findByIdAndUpdate(user.team, { $pull: { members: user._id } });
  }
  res.status(204).send();
});

export default router;
