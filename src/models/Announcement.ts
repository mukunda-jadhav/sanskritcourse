import { Schema, model, models, Document } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  message: string;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

export default models.Announcement || model<IAnnouncement>("Announcement", AnnouncementSchema);
