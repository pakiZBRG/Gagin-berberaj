import { Document } from "mongoose";

export default interface IUser extends Document {
  name: string;
  price: string;
  description: string;
}
