import mongoose, { Schema } from 'mongoose';
const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: String,
  userRole: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  text: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);