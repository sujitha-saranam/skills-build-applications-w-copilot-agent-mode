"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0 },
}, { timestamps: true });
const Team = (0, mongoose_1.model)('Team', teamSchema);
exports.default = Team;
