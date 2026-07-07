import { Schema, model, models, Document, Types } from "mongoose";
import { randomUUID } from "crypto";

export interface ICertificate extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  certificateId: string;
  score: number;
  issuedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  certificateId: { type: String, unique: true, default: () => randomUUID() },
  score: { type: Number, default: 0 },
  issuedAt: { type: Date, default: Date.now },
});

export default models.Certificate || model<ICertificate>("Certificate", CertificateSchema);
