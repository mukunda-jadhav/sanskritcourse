import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  userEmail: string;
  phone: string;
  plan: 'monthly' | 'yearly' | 'lifetime';
  amount: number;
  transactionId: string;
  screenshot?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    phone: { type: String, required: true },
    plan: { type: String, enum: ['monthly', 'yearly', 'lifetime'], required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    screenshot: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    rejectionReason: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
