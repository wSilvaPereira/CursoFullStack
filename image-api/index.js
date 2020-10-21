import express from 'express';
import imagesRouter from './routes/images.js';
// import { promises as fs } from 'fs';

const app = express();

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/images', imagesRouter);

app.listen(3000, async () => {
  console.log('API started.');
});
