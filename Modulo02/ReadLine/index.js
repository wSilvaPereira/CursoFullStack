import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

pergunta();

function pergunta() {
  rl.question('Digite um número: ', (data) => {
    let numero = parseInt(data, 10);
    if (numero === -1) {
      rl.close();
    } else {
      console.log(data);
      const multiplos = [];
      for (let i = 0; i < numero; i++) {
        if (i !== 0 && (i % 3 === 0 || i % 5 === 0)) {
          multiplos.push(i);
        }
      }
      console.log(multiplos);
      pergunta();
    }
  });
}
