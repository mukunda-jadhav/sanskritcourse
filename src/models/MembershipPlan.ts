import { Schema, model, models, Document } from "mongoose";

export interface IMembershipPlan extends Document {
  name: "monthly" | "yearly" | "lifetime";
  price: number;
  durationInDays: number | null;
  features: string[];
  isActive: boolean;
}

const MembershipPlanSchema = new Schema<IMembershipPlan>(
  {
    name: { type: String, enum: ["monthly", "yearly", "lifetime"], required: true, unique: true },
    price: { type: Number, required: true },
    durationInDays: { type: Number, default: null },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.MembershipPlan || model<IMembershipPlan>("MembershipPlan", MembershipPlanSchema);
