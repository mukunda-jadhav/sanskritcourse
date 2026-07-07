import { Schema, model, models, Document } from "mongoose";

export type NoteCategory =
  | "grammar"
  | "vocabulary"
  | "sandhi"
  | "samasa"
  | "verb-charts"
  | "declensions"
  | "shloka-pdfs"
  | "worksheets"
  | "revision-notes";

export interface INote extends Document {
  title: string;
  slug: string;
  category: NoteCategory;
  description?: string;
  thumbnail?: string;
  fileUrl: string;
  isPremium: boolean;
  downloadsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["grammar", "vocabulary", "sandhi", "samasa", "verb-charts", "declensions", "shloka-pdfs", "worksheets", "revision-notes"],
      required: true,
    },
    description: { type: String },
    thumbnail: { type: String },
    fileUrl: { type: String, required: true },
    isPremium: { type: Boolean, default: true },
    downloadsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Note || model<INote>("Note", NoteSchema);
