import { Document } from 'mongoose';
import IUser from './user'

export default interface ILog extends Document {
   user: IUser,
   os: string,
   browser: string,
   description: string,
}