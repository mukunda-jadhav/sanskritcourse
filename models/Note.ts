import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  title: string;
  description: string;
  thumbnail?: string;
  fileUrl: string;
  category: string;
  isPremium: boolean;
  tier: 'free' | 'premium';
  downloads: number;
  isPublished: boolean;
  createdAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String },
    fileUrl: { type: String, required: true },
    category: { type: String, required: true },
    isPremium: { type: Boolean, default: true },
    tier: { type: String, enum: ['free', 'premium'], default: 'premium' },
    downloads: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);