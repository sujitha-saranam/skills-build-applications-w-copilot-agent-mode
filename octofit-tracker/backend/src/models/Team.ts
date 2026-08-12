import { Schema, model, Document, Types } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  description?: string;
  members: Types.ObjectId[];
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Team = model<TeamDocument>('Team', teamSchema);
export default Team;
