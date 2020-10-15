import express from 'express';
import accountsRouter from './routes/accounts.js';
import { promises as fs } from 'fs';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';

const { readFile, writeFile } = fs;

global.fileName = 'accounts.json';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    //console.log('API started.');
    global.logger.info('API started.');
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        global.logger.info('API started and file created.');
      })
      .catch((Error) => {
        global.logger.error(Error);
      });
  }
});
