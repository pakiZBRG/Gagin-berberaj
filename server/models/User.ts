import mongoose, { Schema } from "mongoose";
import IUser from '../interfaces'

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: String,
  activationToken: String,
  passwordToken: String,
  status: { type: String, default: "PENDING" }
}, { timestamps: true },
);

export default mongoose.model<IUser>('User', userSchema);
