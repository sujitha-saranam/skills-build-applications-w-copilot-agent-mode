"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/workouts', workouts_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'Welcome to the OctoFit Tracker API' });
});
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'OctoFit Tracker API' });
});
app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on http://localhost:${port}`);
});
