import mongoose, { Schema } from "mongoose";
import ILog from "../interfaces/log";

const logSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    os: { type: String, trim: true },
    browser: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ILog>("Log", logSchema);
