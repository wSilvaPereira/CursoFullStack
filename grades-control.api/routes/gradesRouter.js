import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

router.use(express.json());

const { readFile, writeFile } = fs;

async function ReadFileJSON() {
  return await JSON.parse(await readFile(global.fileName));
}

async function writeFileJSON(data) {
  await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

router.post('/', async (req, res, next) => {
  try {
    let grade = req.body;

    if (
      !grade.student ||
      !grade.subject ||
      !grade.type ||
      grade.value == null
    ) {
      throw new Error('Student, subject, type e value são obrigatórios');
    }
    const data = await ReadFileJSON();

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };

    data.grades.push(grade);
    await writeFileJSON(data);

    console.log(
      `${req.method} ${req.baseUrl}${req.url} - ${JSON.stringify(grade)} `
    );

    res.send(grade);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    let grade = req.body;
    if (
      !grade.id ||
      // !grade.student ||
      // !grade.subject ||
      // !grade.type ||
      grade.value == null
    ) {
      throw new Error('ID, Student, subject, type e value são obrigatórios');
    }

    const data = await ReadFileJSON();

    const id = parseInt(grade.id, 10);
    const index = data.grades.findIndex((a) => a.id === id);

    if (index === -1) {
      throw new Error('Registro não encontrado');
    }

    data.grades[index].student = data.grades[index].student;
    data.grades[index].subject = data.grades[index].subject;
    data.grades[index].type = data.grades[index].type;
    data.grades[index].value = grade.value;
    console.log(data.grades[index]);
    await writeFileJSON(data);

    console.log(
      `${req.method} ${req.baseUrl}${req.url} - ${JSON.stringify(grade)}`
    );

    res.send(grade);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const data = await ReadFileJSON();
    data.grades = data.grades.filter((grade) => {
      return grade.id !== id;
    });
    writeFileJSON(data);

    console.log(`${req.method} ${req.baseUrl}${req.url}ID: ${id}`);

    res.end();
  } catch (error) {
    next(error);
  }
});

router.get('/sumGrades', async (req, res, next) => {
  try {
    let grade = req.body;
    if (!grade.student || !grade.subject) {
      throw new Error('Student, subject são obrigatórios');
    }
    const data = await ReadFileJSON();

    const dataSum = data.grades.filter((a) => {
      return a.subject === grade.subject && a.student === grade.student;
    });

    const sumGrade = dataSum.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    res.send({
      student: grade.student,
      subject: grade.subject,
      sumGrade: sumGrade,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/averageGrades', async (req, res, next) => {
  try {
    let grade = req.body;
    if (!grade.type || !grade.subject) {
      throw new Error('Type, subject são obrigatórios');
    }
    const data = await ReadFileJSON();
    const dataAvg = data.grades.filter((a) => {
      return a.subject === grade.subject && a.type === grade.type;
    });
    const sumGrade = dataAvg.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);
    const averageGrade = sumGrade / dataAvg.length;
    res.send({
      subject: grade.subject,
      type: grade.type,
      averageGrade: averageGrade,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/biggerGrades', async (req, res, next) => {
  try {
    let grade = req.body;
    if (!grade.type || !grade.subject) {
      throw new Error('Type, subject são obrigatórios');
    }
    const data = await ReadFileJSON();
    const dataGrades = data.grades
      .filter((a) => {
        return a.subject === grade.subject && a.type === grade.type;
      })
      .sort((a, b) => {
        return b.value - a.value;
      });

    // console.log(dataGrades);

    const arrayGrade = [];
    for (let i = 0; i < 3; i++) {
      arrayGrade.push(dataGrades[i]);
    }

    res.send(arrayGrade);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = await ReadFileJSON();
    const grade = data.grades.find((grade) => grade.id === id);

    console.log(`${req.method} ${req.baseUrl}${req.url} ID: ${id}`);
    res.send(grade);
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  res.status(400).send({ error: error.message });
  console.log(`${req.method} ${req.baseUrl}${req.url} - ${error.message} `);
});

export default router;
