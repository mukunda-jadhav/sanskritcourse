import { Schema, model, models, Document, Types } from "mongoose";

export interface IComment extends Document {
  user: Types.ObjectId;
  lesson?: Types.ObjectId;
  blog?: Types.ObjectId;
  content: string;
  parentComment?: Types.ObjectId;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson" },
    blog: { type: Schema.Types.ObjectId, ref: "Blog" },
    content: { type: String, required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

export default models.Comment || model<IComment>("Comment", CommentSchema);
