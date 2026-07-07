import { Schema, model, models, Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: "credentials" | "google";
  role: "student" | "admin";
  bookmarks: Types.ObjectId[];
  wishlist: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    image: { type: String },
    provider: { type: String, enum: ["credentials", "google"], default: "credentials" },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
