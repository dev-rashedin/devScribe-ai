import mongoose, { Schema, Document } from 'mongoose';

export interface IHistory extends Document {
  userId: mongoose.Types.ObjectId;
  service: string; // e.g. "code-explainer"
  input: string;
  output: string;
  createdAt: Date;
}

const historySchema = new Schema({
  uid: { type: String, required: true, index: true },
  email: { type: String },
  service: { type: String, required: true },
  title: { type: String, required: true },
  messages: [
    {
      role: { type: String, enum: ['user', 'assistant'], required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export const History = mongoose.model<IHistory>('History', historySchema);
