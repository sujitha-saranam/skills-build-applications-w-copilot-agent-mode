import { Router } from 'express';
import Team from '../models/Team';
import User from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members');
  res.json(teams);
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members');
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json(team);
});

router.post('/', async (req, res) => {
  const { name, description, members = [] } = req.body;
  const team = new Team({ name, description, members, points: 0 });
  await team.save();

  if (members.length) {
    await User.updateMany({ _id: { $in: members } }, { team: team._id });
  }

  res.status(201).json(team);
});

router.put('/:id', async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json(team);
});

router.delete('/:id', async (req, res) => {
  const team = await Team.findByIdAndDelete(req.params.id);
  if (!team) return res.status(404).json({ message: 'Team not found' });
  await User.updateMany({ team: team._id }, { $unset: { team: '' } });
  res.status(204).send();
});

export default router;
