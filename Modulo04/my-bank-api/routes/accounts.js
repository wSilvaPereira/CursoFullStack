import express from 'express';
import { promises as fs } from 'fs';
const router = express.Router();

router.use(express.json());

const { readFile, writeFile } = fs;

router.post('/', async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    account = { id: data.nextId++, ...account };

    data.accounts.push(account);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  res.end();
});

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const id = parseInt(req.params.id, 10);
    const account = data.accounts.find((account) => account.id === id);
    res.send(account);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const id = parseInt(req.params.id, 10);
    data.accounts = data.accounts.filter((account) => {
      return account.id !== id;
    });
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    let account = req.body;
    const id = parseInt(account.id, 10);
    const index = data.accounts.findIndex((a) => a.id === id);

    data.accounts[index] = account;
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.patch('/updateBalance', async (req, res) => {
  try {
    let account = req.body;
    const id = parseInt(account.id, 10);
    const balance = parseFloat(account.balance);

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === id);

    data.accounts[index].balance = balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.accounts[index]);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
