import { Schema, model, models, Document, Types } from "mongoose";

export interface IMembership extends Document {
  user: Types.ObjectId;
  plan: "monthly" | "yearly" | "lifetime";
  status: "active" | "expired" | "inactive";
  startDate: Date;
  endDate: Date | null;
  payment: Types.ObjectId;
}

const MembershipSchema = new Schema<IMembership>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["monthly", "yearly", "lifetime"], required: true },
    status: { type: String, enum: ["active", "expired", "inactive"], default: "inactive" },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },
  },
  { timestamps: true }
);

export default models.Membership || model<IMembership>("Membership", MembershipSchema);
