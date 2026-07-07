import { Schema, model, models, Document, Types } from "mongoose";

export interface IQuizQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface IQuiz extends Document {
  title: string;
  course?: Types.ObjectId;
  lesson?: Types.ObjectId;
  type: "mcq" | "fill-blank" | "translation" | "grammar" | "vocabulary";
  questions: IQuizQuestion[];
  passingScore: number;
  timeLimitMinutes?: number;
  createdAt: Date;
}

const QuizSchema = new Schema<IQuiz>(
  {
    title: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson" },
    type: { type: String, enum: ["mcq", "fill-blank", "translation", "grammar", "vocabulary"], default: "mcq" },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String }],
        correctAnswer: { type: String, required: true },
        points: { type: Number, default: 1 },
      },
    ],
    passingScore: { type: Number, default: 60 },
    timeLimitMinutes: { type: Number },
  },
  { timestamps: true }
);

export default models.Quiz || model<IQuiz>("Quiz", QuizSchema);
