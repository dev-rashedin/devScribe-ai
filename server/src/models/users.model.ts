import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  uid: string; 
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  subscription: 'free' | 'premium';
  premiumExpiresAt?: number | null;
  history: mongoose.Types.ObjectId[]; 
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    photoURL: { type: String },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    subscription: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free',
    },
    premiumExpiresAt: { type: Number, default: null },
    history: [{ type: Schema.Types.ObjectId, ref: 'History' }],
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
