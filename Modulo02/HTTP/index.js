import http from 'http';

http
  .createServer((req, res) => {
    // console.log(req.method);
    // console.log(req.url);
    if (req.method === 'GET' && req.url === '/teste') {
      res.write('Get /teste executado com sucesso');
    } else {
      res.write('Hello World!');
    }
    res.statusCode = 200;
    res.end();
  })
  .listen(8080);
