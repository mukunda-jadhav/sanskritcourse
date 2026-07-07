import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  completedLessons: mongoose.Types.ObjectId[];
  lastWatched?: mongoose.Types.ObjectId;
  percentage: number;
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    completedLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    lastWatched: { type: Schema.Types.ObjectId, ref: 'Lesson' },
    percentage: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
