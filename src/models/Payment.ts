import { Schema, model, models, Document, Types } from "mongoose";

export interface IPayment extends Document {
  user: Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  plan: "monthly" | "yearly" | "lifetime";
  amount: number;
  transactionId: string;
  screenshotUrl?: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    plan: { type: String, enum: ["monthly", "yearly", "lifetime"], required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    screenshotUrl: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    rejectionReason: { type: String },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

export default models.Payment || model<IPayment>("Payment", PaymentSchema);
