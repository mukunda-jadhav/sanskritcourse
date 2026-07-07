import mongoose, { Schema, Document } from 'mongoose';

export interface IMembership extends Document {
  userId: mongoose.Types.ObjectId;
  plan: 'monthly' | 'yearly' | 'lifetime';
  status: 'active' | 'expired' | 'pending';
  startDate: Date;
  endDate?: Date;
  paymentId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const MembershipSchema = new Schema<IMembership>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    plan: { type: String, enum: ['monthly', 'yearly', 'lifetime'], required: true },
    status: { type: String, enum: ['active', 'expired', 'pending'], default: 'pending' },
    startDate: { type: Date },
    endDate: { type: Date },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
  },
  { timestamps: true }
);

export default mongoose.models.Membership || mongoose.model<IMembership>('Membership', MembershipSchema);
