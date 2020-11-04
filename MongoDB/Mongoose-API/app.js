import express from 'express';
import { studentRouter } from './routes/studentRouter.js';
import mongoose from 'mongoose';

async function connectMongoose() {
  await mongoose.connect(
    'mongodb+srv://williampereira:19william84@cluster0.pt00x.mongodb.net/grades?retryWrites=true&w=majority',
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

app.listen(3000, () => {
  console.log('API iniciada');
});
