import dotenv from 'dotenv';
import express from 'express';
import { studentRouter } from './routes/studentRouter.js';
import mongoose from 'mongoose';

dotenv.config();

// require('dotenv').config();

async function connectMongoose() {
  await mongoose.connect(
    `mongodb+srv://${process.env.USERDB}:${process.env.PSWDB}@cluster0.pt00x.mongodb.net/grades?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}
try {
  connectMongoose();
  mongoose.pluralize(null);
  console.log('Conectado ao Mongo DB Atlas.');
} catch (error) {
  console.log(`Erro ao conectar no Mongo DB Atlas ${error}`);
}

const app = express();
app.use(express.json());
app.use('/student', studentRouter);

app.listen(process.env.PORT, () => {
  console.log('API iniciada');
});
