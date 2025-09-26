import mongoose, { Schema, Document } from 'mongoose';

export interface IHistory extends Document {
  userId: mongoose.Types.ObjectId;
  service: string; // e.g. "code-explainer"
  input: string;
  output: string;
  createdAt: Date;
}

const historySchema = new Schema<IHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: String, required: true },
    input: { type: String, required: true },
    output: { type: String, required: true },
  },
  { timestamps: true }
);

export const History = mongoose.model<IHistory>('History', historySchema);
