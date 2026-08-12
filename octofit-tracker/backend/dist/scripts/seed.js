"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Workout_1 = __importDefault(require("../models/Workout"));
const LeaderboardEntry_1 = __importDefault(require("../models/LeaderboardEntry"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User_1.default.deleteMany({}),
            Team_1.default.deleteMany({}),
            Activity_1.default.deleteMany({}),
            Workout_1.default.deleteMany({}),
            LeaderboardEntry_1.default.deleteMany({}),
        ]);
        const teams = await Team_1.default.create([
            { name: 'OctoRunners', description: 'High-energy running team', points: 0 },
            { name: 'AquaSquad', description: 'Swimming and recovery crew', points: 0 },
        ]);
        const users = await User_1.default.create([
            { username: 'naija', email: 'naija@example.com', profileImage: '', team: teams[0]._id, points: 650 },
            { username: 'sam', email: 'sam@example.com', profileImage: '', team: teams[0]._id, points: 520 },
            { username: 'lina', email: 'lina@example.com', profileImage: '', team: teams[1]._id, points: 420 },
            { username: 'tariq', email: 'tariq@example.com', profileImage: '', team: teams[1]._id, points: 380 },
        ]);
        teams[0].members = [users[0]._id, users[1]._id];
        teams[1].members = [users[2]._id, users[3]._id];
        teams[0].points = 1170;
        teams[1].points = 800;
        await Promise.all(teams.map((team) => team.save()));
        const workouts = await Workout_1.default.create([
            {
                name: 'Morning Power Run',
                description: 'A fast-paced cardio routine to start the day strong.',
                difficulty: 'medium',
                durationMinutes: 30,
                targetMuscles: ['legs', 'core'],
                createdBy: users[0]._id,
            },
            {
                name: 'Strength Circuit',
                description: 'Full body strength circuit with focus on stability.',
                difficulty: 'hard',
                durationMinutes: 45,
                targetMuscles: ['arms', 'back', 'core'],
                createdBy: users[1]._id,
            },
            {
                name: 'Recovery Yoga',
                description: 'Gentle recovery session for flexibility and breathwork.',
                difficulty: 'easy',
                durationMinutes: 25,
                targetMuscles: ['full body'],
                createdBy: users[2]._id,
            },
        ]);
        await Activity_1.default.create([
            {
                user: users[0]._id,
                team: teams[0]._id,
                type: 'Run',
                durationMinutes: 32,
                caloriesBurned: 420,
                distanceKm: 6.4,
                date: new Date(Date.now() - 1000 * 60 * 60 * 24),
            },
            {
                user: users[1]._id,
                team: teams[0]._id,
                type: 'Strength',
                durationMinutes: 50,
                caloriesBurned: 520,
                date: new Date(Date.now() - 1000 * 60 * 60 * 20),
            },
            {
                user: users[2]._id,
                team: teams[1]._id,
                type: 'Swim',
                durationMinutes: 40,
                caloriesBurned: 380,
                distanceKm: 1.2,
                date: new Date(Date.now() - 1000 * 60 * 60 * 16),
            },
            {
                user: users[3]._id,
                team: teams[1]._id,
                type: 'Yoga',
                durationMinutes: 28,
                caloriesBurned: 240,
                date: new Date(Date.now() - 1000 * 60 * 60 * 12),
            },
        ]);
        await LeaderboardEntry_1.default.create([
            {
                title: 'Top User: naija',
                entityType: 'User',
                entityRef: users[0]._id,
                score: users[0].points,
                rank: 1,
                period: 'weekly',
            },
            {
                title: 'Top User: sam',
                entityType: 'User',
                entityRef: users[1]._id,
                score: users[1].points,
                rank: 2,
                period: 'weekly',
            },
            {
                title: 'Top Team: OctoRunners',
                entityType: 'Team',
                entityRef: teams[0]._id,
                score: teams[0].points,
                rank: 1,
                period: 'weekly',
            },
            {
                title: 'Team Runner-up: AquaSquad',
                entityType: 'Team',
                entityRef: teams[1]._id,
                score: teams[1].points,
                rank: 2,
                period: 'weekly',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
