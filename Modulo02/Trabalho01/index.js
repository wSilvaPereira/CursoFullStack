import { promises as fs } from 'fs';
import { cincoEstados, qtdeCidadeEstado } from './funcoes.js';
import readline from 'readline';

let estados = [];
let estadosQtde = [];
let cidades = [];

let maioresNomes = [];
let menoresNomes = [];

async function manipulateFiles() {
  estadosQtde = [];
  estados = JSON.parse(await fs.readFile('./Arquivos/Estados.json'));
  cidades = JSON.parse(await fs.readFile('./Arquivos/Cidades.json'));

  for (let i = 0; i < estados.length; i++) {
    const fileName = `./Arquivos/Estados/${estados[i].Sigla}.json`;

    const cidadesEstado = cidades.filter((cidade) => {
      return cidade.Estado === estados[i].ID;
    });

    await fs.writeFile(fileName, JSON.stringify(cidadesEstado));

    let id = estados[i].ID;
    let uf = estados[i].Sigla;
    let qtde = cidadesEstado.length;
    estadosQtde.push({ id, uf, qtde });
  }

  console.log('Quantidade de cidades por estado');
  estados.forEach((estado) => {
    qtdeCidadeEstado(estadosQtde, estado.Sigla);
  });
  console.log();

  console.log('5 estados com maior quantidade de cidades');
  cincoEstados(estadosQtde, 'Maiores');
  console.log();

  console.log('5 estados com menor quantidade de cidades');
  cincoEstados(estadosQtde, 'Menores');
  console.log();

  console.log('Maior cidade por estado');
  nomeEstadoMaiorMenor('Maiores');
  console.log();

  console.log('Menor cidade por estado');
  nomeEstadoMaiorMenor('Menores');
  console.log();

  maioresNomes = maioresNomes.sort((a, b) => {
    return a.uf.localeCompare(b.uf);
  });
  menoresNomes = menoresNomes.sort((a, b) => {
    return a.uf.localeCompare(b.uf);
  });
  console.log('Maior cidade geral');
  maiorCidadeGeral();
  console.log();

  console.log('Menor cidade geral');
  menorCidadeGeral();
  console.log();
}

function nomeEstadoMaiorMenor(tipo) {
  estadosQtde.forEach((item) => {
    let cidadesEstado = cidades
      .filter((cidade) => {
        return cidade.Estado === item.id;
      })
      .sort((a, b) => {
        if (tipo === 'Maiores') {
          return b.Nome.length - a.Nome.length;
        } else {
          return a.Nome.length - b.Nome.length;
        }
      });
    let tamanho = cidadesEstado[0].Nome.length;

    let cidadesFiltradas = cidadesEstado
      .filter((cidade) => {
        return cidade.Nome.length === tamanho;
      })
      .sort((a, b) => {
        return a.Nome.localeCompare(b.Nome);
      });

    let estadoUF = estados.find((estado) => {
      return estado.ID === cidadesFiltradas[0].Estado;
    });
    console.log(estadoUF.Sigla + ' - ' + cidadesFiltradas[0].Nome);

    let cidade = cidadesFiltradas[0].Nome;
    let uf = estadoUF.Sigla;
    if (tipo === 'Maiores') {
      maioresNomes.push({ uf, cidade });
    } else {
      menoresNomes.push({ uf, cidade });
    }
  });
}

function maiorCidadeGeral() {
  let cidadeMaior = maioresNomes.sort((a, b) => {
    return b.cidade.length - a.cidade.length;
  });

  const tamanho = cidadeMaior[0].cidade.length;

  let cidadeFiltrada = cidadeMaior
    .filter((cidade) => {
      return cidade.cidade.length === tamanho;
    })
    .sort((a, b) => {
      return a.cidade.localeCompare(b.cidade);
    });
  console.log(cidadeFiltrada[0]);
}

function menorCidadeGeral() {
  let cidadeMenor = menoresNomes.sort((a, b) => {
    return a.cidade.length - b.cidade.length;
  });

  // console.log(cidadeMenor);

  const tamanho = cidadeMenor[0].cidade.length;

  let cidadeFiltrada = cidadeMenor
    .filter((cidade) => {
      return cidade.cidade.length === tamanho;
    })
    .sort((a, b) => {
      return a.cidade.localeCompare(b.cidade);
    });
  console.log(cidadeFiltrada[0]);
}

manipulateFiles();
