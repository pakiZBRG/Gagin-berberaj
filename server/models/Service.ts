import mongoose, { Schema } from "mongoose";
import IService from '../interfaces/service'

const serviceSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  description: String,
}, { timestamps: true },
);

export default mongoose.model<IService>('Service', serviceSchema);
