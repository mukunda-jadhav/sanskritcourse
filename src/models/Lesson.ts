import { Schema, model, models, Document, Types } from "mongoose";

export interface ILesson extends Document {
  course: Types.ObjectId;
  title: string;
  slug: string;
  order: number;
  videoUrl?: string;
  durationMinutes: number;
  content?: string;
  resources: { title: string; url: string }[];
  isFreePreview: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    order: { type: Number, default: 0 },
    videoUrl: { type: String },
    durationMinutes: { type: Number, default: 0 },
    content: { type: String },
    resources: [{ title: String, url: String }],
    isFreePreview: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Lesson || model<ILesson>("Lesson", LessonSchema);
