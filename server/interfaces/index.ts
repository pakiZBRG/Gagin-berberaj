import { Document } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  price: string;
  description: string;
}

export default interface ILog extends Document {
  user: IUser,
  os: string,
  browser: string,
  description: string,
}

export default interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  image: string;
  activationToken: string;
  passwordToken: string;
  status: string;
}

export default interface IWorkingTime extends Document {
  monday: { start: string, end: string },
  tuesday: { start: string, end: string },
  wednesday: { start: string, end: string },
  thursday: { start: string, end: string },
  friday: { start: string, end: string },
  saturday: { start: string, end: string },
  sunday: { start: string, end: string },
}
