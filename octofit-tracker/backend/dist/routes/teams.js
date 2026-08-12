"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await Team_1.default.find().populate('members');
    res.json(teams);
});
router.get('/:id', async (req, res) => {
    const team = await Team_1.default.findById(req.params.id).populate('members');
    if (!team)
        return res.status(404).json({ message: 'Team not found' });
    res.json(team);
});
router.post('/', async (req, res) => {
    const { name, description, members = [] } = req.body;
    const team = new Team_1.default({ name, description, members, points: 0 });
    await team.save();
    if (members.length) {
        await User_1.default.updateMany({ _id: { $in: members } }, { team: team._id });
    }
    res.status(201).json(team);
});
router.put('/:id', async (req, res) => {
    const team = await Team_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team)
        return res.status(404).json({ message: 'Team not found' });
    res.json(team);
});
router.delete('/:id', async (req, res) => {
    const team = await Team_1.default.findByIdAndDelete(req.params.id);
    if (!team)
        return res.status(404).json({ message: 'Team not found' });
    await User_1.default.updateMany({ team: team._id }, { $unset: { team: '' } });
    res.status(204).send();
});
exports.default = router;
