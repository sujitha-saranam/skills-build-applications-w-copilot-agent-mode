import { Schema, model, Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  profileImage?: string;
  team?: Types.ObjectId;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    profileImage: { type: String },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = model<UserDocument>('User', userSchema);
export default User;
