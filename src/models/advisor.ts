import mongoose from 'mongoose';

interface advisorAttrs {
  name: string;
  photoURL: string;
}

interface advisorDoc extends mongoose.Document {
  name: string;
  photoURL: string;
}

interface advisorModel extends mongoose.Model<advisorDoc> {
  build(attrs: advisorAttrs): advisorDoc;
}

const advisorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      required: true,
    },
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

advisorSchema.statics.build = (attrs: advisorAttrs) => {
  return new Advisor(attrs);
};

const Advisor = mongoose.model<advisorDoc, advisorModel>(
  'Advisor',
  advisorSchema
);

export { Advisor };
