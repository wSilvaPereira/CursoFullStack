export function cincoEstados(listaEstado, tipo) {
  let estadoOrdenado = listaEstado.sort((a, b) => {
    if (tipo === 'Maiores') {
      return b.qtde - a.qtde;
    } else {
      return a.qtde - b.qtde;
    }
  });

  let lista = [];

  for (let i = 0; i < 5; i++) {
    lista[i] = estadoOrdenado[i];
  }

  lista = lista.sort((a, b) => {
    return b.qtde - a.qtde;
  });

  console.log(lista);
}

export function qtdeCidadeEstado(listaEstado, uf) {
  let estado = listaEstado.find((item) => {
    return item.uf === uf;
  });
  console.log(uf + ' - ' + estado.qtde);
}
