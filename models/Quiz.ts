import mongoose, { Schema, Document } from 'mongoose';

const QuestionSchema = new Schema({
  type: { type: String, enum: ['mcq', 'fill-blank', 'translation'], required: true },
  question: { type: String, required: true },
  options: [{ type: String }],
  answer: { type: String, required: true },
  explanation: { type: String },
});

export interface IQuiz extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  questions: typeof QuestionSchema[];
  passingScore: number;
}

const QuizSchema = new Schema<IQuiz>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    questions: [QuestionSchema],
    passingScore: { type: Number, default: 60 },
  },
  { timestamps: true }
);

export default mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
