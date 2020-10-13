var numero = parseInt(process.argv[2], 10);
const multiplos = [];

for (let i = 0; i < numero; i++) {
  if (i !== 0 && (i % 3 === 0 || i % 5 === 0)) {
    multiplos.push(i);
  }
}

console.log(multiplos);
