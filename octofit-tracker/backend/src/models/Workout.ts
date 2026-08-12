import { Schema, model, Document, Types } from 'mongoose';

export interface WorkoutDocument extends Document {
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  durationMinutes: number;
  targetMuscles: string[];
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    targetMuscles: [{ type: String, trim: true }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Workout = model<WorkoutDocument>('Workout', workoutSchema);
export default Workout;
