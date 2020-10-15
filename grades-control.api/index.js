import express from 'express';
import { promises as fs } from 'fs';
import gradeRouter from './routes/gradesRouter.js';

const { readFile, writeFile } = fs;

global.fileName = 'grades.json';

const app = express();
app.use(express.json());

app.use('/grade', gradeRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    console.log('API started.');
  } catch (error) {
    console.log(error);
  }
});
