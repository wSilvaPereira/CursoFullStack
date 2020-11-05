import express from 'express';
import { accountRouter } from './routes/accountRouter.js';
import mongoose from 'mongoose';

async function connectMongoose() {
  await mongoose.connect(
    'mongodb+srv://IGTI_USER:igti123@cluster0.pt00x.mongodb.net/my-bank?retryWrites=true&w=majority',
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
app.use('/account', accountRouter);

app.listen(3000, () => {
  console.log('API iniciada');
});
