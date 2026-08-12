"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await User_1.default.find().populate('team');
    res.json(users);
});
router.get('/:id', async (req, res) => {
    const user = await User_1.default.findById(req.params.id).populate('team');
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    res.json(user);
});
router.post('/', async (req, res) => {
    const { username, email, profileImage, team: teamId } = req.body;
    const user = new User_1.default({ username, email, profileImage, team: teamId, points: 0 });
    await user.save();
    if (teamId) {
        await Team_1.default.findByIdAndUpdate(teamId, { $addToSet: { members: user._id } });
    }
    res.status(201).json(user);
});
router.put('/:id', async (req, res) => {
    const user = await User_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    res.json(user);
});
router.delete('/:id', async (req, res) => {
    const user = await User_1.default.findByIdAndDelete(req.params.id);
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    if (user.team) {
        await Team_1.default.findByIdAndUpdate(user.team, { $pull: { members: user._id } });
    }
    res.status(204).send();
});
exports.default = router;
