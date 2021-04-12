import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface userAttrs {
  name: string;
  email: string;
  password: string;
}

interface userDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

interface userModel extends mongoose.Model<userDoc> {
  build(attrs: userAttrs): userDoc;
}

const userSchema = new mongoose.Schema({
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
});

userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<userDoc, userModel>('User', userSchema);

export { User };
