import express from 'express';
import { accountsModel } from '../models/accountModel.js';

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
        res.status(200).send('Documento excluído com sucesso');
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

// 10 - Cliente Menor Saldo
//In - Limit
//Out - {agencia, conta, saldo crescente}

// 11 - Clientes mais ricos
//In - Limit
//Out - {agencia, conta, nome, saldo descrescente}

// 12 - Tranferir cliente maior saldo agencia=99
//In - null
//Out - { clientes da agencia private}

// //Create
// app.post('', async (req, res) => {
//   try {
//     const student = new accountModel(req.body);
//     await student.save();
//     res.send(student);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// //RETRIEVE
// app.get('', async (req, res) => {
//   try {
//     const student = await accountModel.find().sort({ name: 1 });
//     res.send(student);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// //UPDATE
// app.patch('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     // console.log(id);
//     // const teste = student;
//     const student = await accountModel.findByIdAndUpdate(
//       { _id: id },
//       req.body,
//       {
//         new: true,
//       }
//     );
//     res.send(student);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// //DELETE
// app.delete('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const student = await accountModel.findByIdAndDelete({ _id: id });
//     if (!student) {
//       res.send(404).send('Documento não encontrado na coleção');
//     } else {
//       res.status(200).send('Documento excluído com sucesso');
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

export { app as accountRouter };
