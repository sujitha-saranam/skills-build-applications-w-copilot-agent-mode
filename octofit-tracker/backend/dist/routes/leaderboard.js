"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_1 = __importDefault(require("../models/LeaderboardEntry"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const entries = await LeaderboardEntry_1.default.find().sort({ rank: 1 });
    res.json(entries);
});
router.get('/:id', async (req, res) => {
    const entry = await LeaderboardEntry_1.default.findById(req.params.id);
    if (!entry)
        return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.json(entry);
});
router.post('/', async (req, res) => {
    const entry = new LeaderboardEntry_1.default(req.body);
    await entry.save();
    res.status(201).json(entry);
});
router.put('/:id', async (req, res) => {
    const entry = await LeaderboardEntry_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry)
        return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.json(entry);
});
router.delete('/:id', async (req, res) => {
    const entry = await LeaderboardEntry_1.default.findByIdAndDelete(req.params.id);
    if (!entry)
        return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.status(204).send();
});
exports.default = router;
