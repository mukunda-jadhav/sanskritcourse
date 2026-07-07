import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  previewVideo?: string;
  instructor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessonsCount: number;
  isPremium: boolean;
  tier: 'free' | 'premium';
  category: string;
  rating: number;
  studentsCount: number;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    previewVideo: { type: String },
    instructor: { type: String, default: 'Sanskrit Gurukul' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    duration: { type: String, default: '0h' },
    lessonsCount: { type: Number, default: 0 },
    isPremium: { type: Boolean, default: true },
    tier: { type: String, enum: ['free', 'premium'], default: 'premium' },
    category: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    studentsCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);