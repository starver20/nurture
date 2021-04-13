import mongoose from 'mongoose';
import { Advisor } from './advisor';

interface userAttrs {
  name: string;
  email: string;
  password: string;
}

interface userDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  booked_advisor: { advisorId: string }[];
}

interface userModel extends mongoose.Model<userDoc> {
  build(attrs: userAttrs): userDoc;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    booked_advisor: [
      {
        advisorId: String,
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<userDoc, userModel>('User', userSchema);

export { User };
