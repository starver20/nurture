import express from 'express';
import mongoose from 'mongoose';
import { adminRouter } from './routes/admin';
import { userRouter } from './routes/user';

const app = express();
app.use(express.json());

try {
  mongoose.connect(
    `mongodb+srv://amar:1@cluster0.cmszp.mongodb.net/nurturelabs`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );
  console.log('connected to mongoDB');
} catch (err) {
  console.log(err);
}

app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
  console.log('listening on 3000');
});
