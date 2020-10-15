import express from 'express';
import winston from 'winston';
import { promises as fs } from 'fs';
import cors from 'cors';

const router = express.Router();

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] #${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

router.use(express.json());

const { readFile, writeFile } = fs;

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || !account.balance == null) {
      throw new Error('Name e balance são obrigatórios');
    }
    const data = JSON.parse(await readFile(global.fileName));

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };

    data.accounts.push(account);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    global.logger.info(
      `${req.method} ${req.baseUrl}${req.url} - ${JSON.stringify(account)} `
    );

    res.send(account);
  } catch (error) {
    next(error);
  }
  res.end();
});

router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);

    global.logger.info(`${req.method} ${req.baseUrl}${req.url}`);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const id = parseInt(req.params.id, 10);
    const account = data.accounts.find((account) => account.id === id);

    global.logger.info(`${req.method} ${req.baseUrl}${req.url} ID: ${id}`);
    res.send(account);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const id = parseInt(req.params.id, 10);
    data.accounts = data.accounts.filter((account) => {
      return account.id !== id;
    });
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    global.logger.info(`${req.method} ${req.baseUrl}${req.url}ID: ${id}`);

    res.end();
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.id || !account.name || !account.balance == null) {
      throw new Error('Id, Name e balance são obrigatórios');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const id = parseInt(account.id, 10);
    const index = data.accounts.findIndex((a) => a.id === id);

    if ((index = -1)) {
      throw new Error('Resgitro não encontrado');
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    global.logger.info(
      `${req.method} ${req.baseUrl}${req.url} - ${JSON.stringify(account)}`
    );

    res.send(account);
  } catch (error) {
    next(error);
  }
});

router.patch('/updateBalance', async (req, res, next) => {
  try {
    let account = req.body;
    if (!account.id || !account.balance == null) {
      throw new Error('Id e balance são obrigatórios');
    }

    const id = parseInt(account.id, 10);
    const balance = parseFloat(account.balance);

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === id);

    if ((index = -1)) {
      throw new Error('Resgitro não encontrado');
    }

    data.accounts[index].balance = balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    global.logger.info(
      `${req.method} ${req.baseUrl}${req.url} - ${JSON.stringify(
        data.accounts[index]
      )}`
    );

    res.send(data.accounts[index]);
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  res.status(400).send({ error: error.message });
  global.logger.error(
    `${req.method} ${req.baseUrl}${req.url} - ${error.message} `
  );
});

export default router;
