import { promises as fs } from 'fs';

// Utilizando Async/Await
// handleFileSystem();
// async function handleFileSystem() {
//   try {
//     await fs.writeFile('teste3.txt', 'bla bla bla');
//     await fs.appendFile('teste3.txt', '\nTeste com Async/Await');
//     const data = await fs.readFile('teste3.txt', 'utf-8');
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

writeReadJson();
async function writeReadJson() {
  try {
    const arrayCarros = ['Gol', 'Palio', 'Uno'];
    const arrayNomes = ['Ana', 'William'];
    const obj = { carros: arrayCarros, nomes: arrayNomes };
    await fs.writeFile('teste.json', JSON.stringify(obj));

    const data = JSON.parse(await fs.readFile('teste.json'));
    // data.carros.push('Tiida');
    data.carros = [...data.carros, 'Tiida'];

    await fs.writeFile('teste.json', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

// Utilizando promises
// fs.writeFile('teste2.txt', 'bla bla bla')
//   .then(() => {
//     fs.appendFile('teste2.txt', '\nteste com promises')
//       .then(() => {
//         fs.readFile('teste2.txt', 'utf-8')
//           .then((data) => {
//             console.log(data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       })
//       .catch((error) => {});
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Utilizando com callbacks
// Assincrona
// fs.writeFile('teste.txt', 'Bla Bla Bla', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     fs.appendFile('teste.txt', '\nteste append file', (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         fs.readFile('teste.txt', 'utf-8', (err, data) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });
//       }
//     });
//   }
// });

// Sincrona
// try {
//   fs.writeFileSync('teste.txt', 'Bla Bla Bla');
//   const data = fs.readFileSync('teste.txt', 'utf-8');
// } catch (error) {
//   console.log(error);
// }
