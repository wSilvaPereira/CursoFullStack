var myHeaders = new Headers();
myHeaders.append(
  'Authorization',
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbnMiOiIwOTkyNDIiLCJuYmYiOjE2MDMyMDEyNTksImV4cCI6MTk0ODgwMTI1OSwiaWF0IjoxNjAzMjAxMjU5LCJpc3MiOiJTa3kifQ.Yqv28A4Kk8mV12FFIxBi5YhZl2Rym89rbMZd_O6nRws'
);
myHeaders.append('Content-Type', 'application/json');

var raw = JSON.stringify({
  tipoDoAto: { tipoDoAto: 'Certidao', categoriaDeAto: 'ConjuntaDeOnusEAcoes' },
  dadosDeIdentificacaoDoAto: {
    dataDeEmissao: '2020-10-21 16:23:52',
    dataDeValidade: '2020-11-20 16:23:52',
  },
  chaveDeAutenticidade: '0992425320190058079274',
  imagemDoAto: 'CjE5NjMwNA0KJSVFT0YNCg',
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch(
  'https://api-autenticidade.cri-rs.com.br/api/EspelhoDosAtos/Imoveis',
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
