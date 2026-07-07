import { Schema, model, models, Document, Types } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: Types.ObjectId;
  category: string;
  tags: string[];
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String, default: "General" },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    seoTitle: { type: String },
    seoDescription: { type: String },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Blog || model<IBlog>("Blog", BlogSchema);
