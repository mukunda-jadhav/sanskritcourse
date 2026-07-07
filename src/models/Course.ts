import { Schema, model, models, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail?: string;
  previewVideoUrl?: string;
  instructor: { name: string; bio?: string; image?: string };
  difficulty: "beginner" | "intermediate" | "advanced";
  durationHours: number;
  lessonsCount: number;
  category: string;
  tags: string[];
  isPremium: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  ratingAvg: number;
  studentsCount: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String },
    previewVideoUrl: { type: String },
    instructor: {
      name: { type: String, required: true },
      bio: { type: String },
      image: { type: String },
    },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    durationHours: { type: Number, default: 0 },
    lessonsCount: { type: Number, default: 0 },
    category: { type: String, required: true },
    tags: [{ type: String }],
    isPremium: { type: Boolean, default: true },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    ratingAvg: { type: Number, default: 0 },
    studentsCount: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Course || model<ICourse>("Course", CourseSchema);
