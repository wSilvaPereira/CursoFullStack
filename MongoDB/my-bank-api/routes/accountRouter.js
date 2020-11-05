import express from 'express';
import { accountsModel } from '../models/accountModel.js';
import { promises as fs } from 'fs';

const app = express();

//Buscar todas as contas
app.get('', async (req, res) => {
  try {
    const accounts = await accountsModel.find();
    res.send(accounts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 4 - Deposito
//In - agencia, conta, balance
//Out - balance
app.patch('/deposito', async (req, res) => {
  try {
    const agencia = req.body.agencia;
    const conta = req.body.conta;
    const balance = req.body.balance;

    if (balance <= 0) {
      res.status(500).send({ erro: 'O saldo deve ser maior que 0' });
    }

    const account = await accountsModel.find({
      agencia: agencia,
      conta: conta,
    });

    if (account.length === 0) {
      //prettier-ignore
      res.status(404).send({ agencia, conta, erro: 'Agência e Conta não localizada' });
    }

    const updatedAccount = await accountsModel.findOneAndUpdate(
      { agencia: agencia, conta: conta },
      { $inc: { balance: balance } },
      { new: true, useFindAndModify: false }
    );

    res.send(updatedAccount);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// 5 - Saque
//In - agencia, conta, balance
//Out - balance
app.patch('/saque', async (req, res) => {
  try {
    const agencia = req.body.agencia;
    const conta = req.body.conta;
    const balance = parseFloat(req.body.balance) + 1;

    if (balance <= 0) {
      res.status(500).send({ erro: 'O saldo deve ser maior que 0' });
    }

    const account = await accountsModel.find({
      agencia: agencia,
      conta: conta,
    });

    const actualBalance = parseFloat(account[0].balance);

    if (account.length === 0) {
      //prettier-ignore
      res.status(404).send({ agencia, conta, erro: 'Agência e Conta não localizada' });
    } else if (actualBalance < balance) {
      //prettier-ignore
      res.status(404).send({ agencia, conta, erro: 'O saldo é insuficiente pra o saque' });
    } else {
      const updatedAccount = await accountsModel.findOneAndUpdate(
        { agencia: agencia, conta: conta },
        { $inc: { balance: balance * -1 } },
        { new: true, useFindAndModify: false }
      );

      res.send(updatedAccount);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// 6 - Consulta Saldo
//In - agencia, conta
//Out - balance
app.get('/getAgenciaContaBalance', async (req, res) => {
  try {
    const agencia = req.body.agencia;
    const conta = req.body.conta;

    const account = await accountsModel.find({
      agencia: agencia,
      conta: conta,
    });

    if (account.length === 0) {
      //prettier-ignore
      res.status(404).send({ agencia, conta, erro: 'Agência e Conta não localizada' });
    } else {
      const sumAccounts = await accountsModel.aggregate([
        { $match: { agencia: agencia, conta: conta } },
        {
          $group: {
            _id: { agencia: '$agencia', conta: '$conta' },
            total: {
              $sum: '$balance',
            },
          },
        },
      ]);
      const totalBalance = sumAccounts[0].total;
      res.send({ agencia, conta, totalBalance });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// 7 - Excluir Conta
//In - agencia, conta
//Out - qtde Contas Ativas
app.delete('', async (req, res) => {
  try {
    const agencia = req.body.agencia;
    const conta = req.body.conta;

    const account = await accountsModel.find({
      agencia: agencia,
      conta: conta,
    });

    if (account.length === 0) {
      //prettier-ignore
      res.status(404).send({ agencia, conta, erro: 'Agência e Conta não localizada' });
    } else {
      const deletedAccount = await accountsModel.findOneAndDelete({
        agencia: agencia,
        conta: conta,
      });
      if (!deletedAccount) {
        res.send(404).send('Documento não encontrado na coleção');
      } else {
        const accounts = await accountsModel.find({ agencia: agencia });
        // console.log(accounts.length);
        res.status(200).send({ qtde: accounts.length });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// 8 - Transferencia
//In - ContaOrigem, ContaDestino
//Out - SaldoContaOrigem
app.patch('/transferencia', async (req, res) => {
  try {
    const contaOrigem = req.body.contaOrigem;
    const contaDestino = req.body.contaDestino;
    const tranferValue = parseFloat(req.body.tranferValue);

    const originAccount = await accountsModel.findOne({ conta: contaOrigem });
    const destinyAccount = await accountsModel.findOne({ conta: contaDestino });

    if (!originAccount) {
      res.send('Conta origem não localizadas');
    } else if (!destinyAccount) {
      res.send('Conta destino não localizada');
    } else {
      let transferTax = 0;
      if (originAccount.agencia !== destinyAccount.agencia) {
        transferTax = 8;
      }

      const agenciaOrigem = originAccount.agencia;
      const agenciaDestino = destinyAccount.agencia;

      const updatedOriginAccount = await accountsModel.findOneAndUpdate(
        { conta: contaOrigem, agencia: agenciaOrigem },
        { $inc: { balance: (tranferValue + transferTax) * -1 } },
        { new: true, useFindAndModify: false }
      );

      const updatedDestinyAccount = await accountsModel.findOneAndUpdate(
        { conta: contaDestino, agencia: agenciaDestino },
        { $inc: { balance: tranferValue } },
        { new: true, useFindAndModify: false }
      );
      res.send(updatedOriginAccount);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// 9 - MediaSaldo
//In - Agencia
//Out - BalanceMedio
app.get('/mediaSaldo', async (req, res) => {
  try {
    const agencia = req.body.agencia;

    const avgAccounts = await accountsModel.aggregate([
      { $match: { agencia: agencia } },
      {
        $group: {
          _id: { agencia: '$agencia' },
          mediaSaldo: {
            $avg: '$balance',
          },
        },
      },
    ]);
    res.send(avgAccounts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 10 - Cliente Menor Saldo
//In - Limit
//Out - {agencia, conta, saldo crescente}
app.get('/clienteMenorSaldo/:qtde', async (req, res) => {
  try {
    const qtde = parseInt(req.params.qtde, 10);
    const accounts = await accountsModel
      .find({}, { _id: 0, agencia: 1, conta: 1, balance: 1 })
      .sort({ balance: 1 })
      .limit(qtde);
    res.send(accounts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 11 - Clientes mais ricos
//In - Limit
//Out - {agencia, conta, nome crescente, saldo descrescente}
app.get('/clientesMaisRicos/:qtde', async (req, res) => {
  try {
    const qtde = parseInt(req.params.qtde, 10);
    const accounts = await accountsModel
      .find({}, { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 })
      .sort({ balance: -1 })
      .limit(qtde)
      .sort({ balance: -1, name: 1 });
    res.send(accounts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 12 - Tranferir cliente maior saldo agencia=99
//In - null
//Out - { clientes da agencia private}
app.put('/transferirClientesPrivate', async (req, res) => {
  try {
    const agencias = await accountsModel.distinct('agencia');
    const contas = [];

    for (let i = 0; i < agencias.length; i++) {
      if (agencias[i] !== 99) {
        const conta = await accountsModel
          .find({ agencia: agencias[i] })
          .sort({ balance: -1 })
          .limit(1);
        contas.push(conta);
      }
    }

    for (let i = 0; i < contas.length; i++) {
      const id = contas[i][0]._id;
      console.log(id);
      const transferedAccount = await accountsModel.findByIdAndUpdate(
        { _id: id },
        { agencia: 99 },
        { new: true }
      );
      console.log(transferedAccount);
    }

    const privatedAccounts = await accountsModel.find({ agencia: 99 });

    res.send(privatedAccounts);
  } catch (error) {
    res.status(500).send(error);
  }
});

//RecriaDados
app.post('/recriaDados', async (req, res) => {
  try {
    const deletedAccounts = await accountsModel.deleteMany({});

    const jsonAccounts = await JSON.parse(
      await fs.readFile('./datas/accounts-2.json')
    );

    const insertedAccounts = await accountsModel.insertMany(jsonAccounts);

    res.send('Dados recriados com sucesso.');
  } catch (error) {
    res.status(500).send(error);
  }
});

export { app as accountRouter };
