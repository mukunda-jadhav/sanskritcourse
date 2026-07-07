import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  videoUrl: string;
  duration: string;
  order: number;
  resources: { title: string; url: string; type: 'pdf' | 'video' | 'link' }[];
  isPremium: boolean;
  tier: 'free' | 'premium';
}

const LessonSchema = new Schema<ILesson>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    duration: { type: String, default: '0:00' },
    order: { type: Number, required: true },
    resources: [{ title: String, url: String, type: { type: String, enum: ['pdf', 'video', 'link'] } }],
    isPremium: { type: Boolean, default: true },
    tier: { type: String, enum: ['free', 'premium'], default: 'premium' },
  },
  { timestamps: true }
);

export default mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', LessonSchema);