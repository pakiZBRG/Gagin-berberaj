import mongoose, { Schema } from "mongoose";
import IUser from '../interfaces/user'

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, default: '' },
    activationToken: { type: String },
    passwordToken: { type: String },
    status: { type: String, default: "PENDING" }
}, { timestamps: true },
);

export default mongoose.model<IUser>('User', userSchema);
