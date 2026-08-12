import { Schema, model, Document, Types } from 'mongoose';

export interface LeaderboardEntryDocument extends Document {
  title: string;
  entityType: 'User' | 'Team';
  entityRef: Types.ObjectId;
  score: number;
  rank: number;
  period: string;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    title: { type: String, required: true },
    entityType: { type: String, required: true, enum: ['User', 'Team'] },
    entityRef: { type: Schema.Types.ObjectId, required: true, refPath: 'entityType' },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, default: 'weekly' },
  },
  { timestamps: true }
);

const LeaderboardEntry = model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);
export default LeaderboardEntry;
