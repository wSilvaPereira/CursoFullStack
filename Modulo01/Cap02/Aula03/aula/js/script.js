var a = 5;
var b = 4;

if (a > b) {
  console.log(a + ' é maior que ' + b);
} else {
  if (a < b) {
    console.log(a + ' é menor que b ' + b);
  } else {
    console.log(a + ' é igual a b ' + b);
  }
}

var dia = 4;
var r = '';
//prettier-ignore
switch (dia) {
  case 1: r = 'Domingo'; break;
  case 2: r = 'Segunda'; break;
  case 3: r = 'Terça'; break;
  case 4: r = 'Quarta'; break;
  case 5: r = 'Quinta'; break;
  case 6: r = 'Sexta'; break;
  case 7: r = 'Sábado'; break;
  default: r = 'Dia inválido';
}

console.log('Hoje é ' + r);
a = 6;
b = 7;
var resposta = a > b ? 'maior' : a < b ? 'menor' : igual;
console.log(resposta);

// Somatório com While

var numeroAtual = 1;
var somatorio = 0;
while (numeroAtual <= 10) {
  // somatorio = somatorio + numeroAtual;
  somatorio += numeroAtual;
  numeroAtual++;
}
console.log(somatorio);

var numeroAtual = 1;
var somatorio = 0;

do {
  somatorio += numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);
console.log(somatorio);

var somatorio = 0;
for (numeroAtual = 1; numeroAtual <= 10; numeroAtual++) {
  somatorio += numeroAtual;
}
console.log(somatorio);
