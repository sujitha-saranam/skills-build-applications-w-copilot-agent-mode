import { Schema, model, Document, Types } from 'mongoose';

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    date: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

const Activity = model<ActivityDocument>('Activity', activitySchema);
export default Activity;
