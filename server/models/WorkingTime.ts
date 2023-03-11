import mongoose, { Schema } from "mongoose";
import IWorkingTime from '../interfaces'

const workingTimeSchema: Schema = new Schema({
  monday: { start: String, end: String },
  tuesday: { start: String, end: String },
  wednesday: { start: String, end: String },
  thursday: { start: String, end: String },
  friday: { start: String, end: String },
  saturday: { start: String, end: String },
  sunday: { start: String, end: String },
}, { timestamps: true },
);

export default mongoose.model<IWorkingTime>('WorkingTime', workingTimeSchema);
