import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'escriba',
  password: 'scrib130',
  database: 'pr_27566_sqlreg3_24032020',
  port: '3306',
});

function connectExecuteUserFunction(usersFunction) {
  try {
    connection.connect((err) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log('conectado');
        usersFunction.forEach((element) => {
          element();
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function getL5Datas() {
  connection.query(
    'select l5_parte, l5_seq, l5_nome, l5_cpf from l5',
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        const mappedParts = rows.map((parte) => {
          const { l5_parte, l5_seq, l5_nome, l5_cpf } = parte;
          return { parte: l5_parte, seq: l5_seq, nome: l5_nome, cpf: l5_cpf };
        });
        connection.end;

        console.log(mappedParts);
      }
    }
  );
}

function getL2Datas() {
  connection.query(
    'select l2_id, l2_matricula, l2_letra, l2_texto from l2 order by l2_matricula',
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        const mappedL2 = rows.map((l2) => {
          const { l2_id, l2_matricula, l2_letra, l2_texto } = l2;
          let textoString = '';
          if (l2_texto) {
            textoString = l2_texto.toString('utf-8');
          }
          return {
            id: l2_id,
            matricula: l2_matricula,
            letra: l2_letra,
            texto: l2_texto,
            textoString: textoString,
          };
        });

        console.log({ l2: mappedL2 });
      }
    }
  );
}

// const listFunction = [getL5Datas, getL2Datas];
const listFunction = [getL2Datas];
connectExecuteUserFunction(listFunction);
