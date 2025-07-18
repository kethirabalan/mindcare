import mongoose, { Document, Schema } from 'mongoose';

export interface IMood extends Document {
  mood: number;
  note: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const MoodSchema = new Schema<IMood>({
  mood: { type: Number, required: true },
  note: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Mood = mongoose.model<IMood>('Mood', MoodSchema);
