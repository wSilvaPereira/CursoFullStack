import express from 'express';
import { studentModel } from '../models/studentModel.js';

const app = express();

//Create
app.post('', async (req, res) => {
  try {
    const student = new studentModel(req.body);
    await student.save();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

//RETRIEVE
app.get('', async (req, res) => {
  try {
    const student = await studentModel.find().sort({ name: 1 });
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE
app.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    // const teste = student;
    const student = await studentModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE
app.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.findByIdAndDelete({ _id: id });
    if (!student) {
      res.send(404).send('Documento não encontrado na coleção');
    } else {
      res.status(200).send('Documento excluído com sucesso');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export { app as studentRouter };
