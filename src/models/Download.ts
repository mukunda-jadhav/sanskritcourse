import { Schema, model, models, Document, Types } from "mongoose";

export interface IDownload extends Document {
  user: Types.ObjectId;
  note: Types.ObjectId;
  downloadedAt: Date;
}

const DownloadSchema = new Schema<IDownload>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  note: { type: Schema.Types.ObjectId, ref: "Note", required: true },
  downloadedAt: { type: Date, default: Date.now },
});

export default models.Download || model<IDownload>("Download", DownloadSchema);
