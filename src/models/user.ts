import mongoose, { Schema } from 'mongoose';

interface userAttrs {
  name: string;
  email: string;
  password: string;
}

interface userDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  bookedAdvisor: { advisor: mongoose.Schema.Types.ObjectId; date: string }[];
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
    bookedAdvisor: [
      {
        advisor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Advisor',
        },
        date: {
          type: String,
        },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.bookedAdvisor.id = ret.bookedAdvisor._id;
        delete ret.bookedAdvisor._id;
      },
    },
  }
);

userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<userDoc, userModel>('User', userSchema);

export { User };
