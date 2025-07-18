import { Schema, model } from 'mongoose';

const journalSchema = new Schema({
  title: String,
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('Journal', journalSchema);
