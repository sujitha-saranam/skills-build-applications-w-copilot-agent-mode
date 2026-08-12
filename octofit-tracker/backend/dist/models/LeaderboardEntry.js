"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    entityType: { type: String, required: true, enum: ['User', 'Team'] },
    entityRef: { type: mongoose_1.Schema.Types.ObjectId, required: true, refPath: 'entityType' },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, default: 'weekly' },
}, { timestamps: true });
const LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', leaderboardEntrySchema);
exports.default = LeaderboardEntry;
