import express from 'express';
const app = express();
app.use(express.json());

app.all('/testeAll', (req, res) => {
  res.send(req.method);
});

app.get('/teste?', (_req, res) => {
  res.send('/teste?');
});

app.get('/teste+', (_req, res) => {
  res.send('/teste+');
});

app.get('/teste*0', (req, res) => {
  res.send(req.path);
});

app.post('/test(ing)?', (req, res) => {
  console.log(req.body);
  res.send(req.path);
});

app.get(/.*Red$/, (req, res) => {
  res.send(req.path);
});

//parâmetro na rota
app.get('/testParam/:id', (req, res) => {
  res.send(req.params.id);
});

//parâmetro via query
app.get('/testQuery', (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

//next
app.get(
  '/testMultipleHandlers',
  (req, res, next) => {
    console.log('CallBackl 1');
    next();
  },
  (req, res) => {
    console.log('CallBackl 2');
    res.end();
  }
);

//next com array
const CallBack1 = (req, res, next) => {
  console.log('CallBackl 1');
  next();
};
const CallBack2 = (req, res, next) => {
  console.log('CallBackl 2');
  next();
};
const CallBack3 = (req, res) => {
  console.log('CallBackl 3');
  res.end();
};

app.get('/testMultipleHandlersArray', [CallBack1, CallBack2, CallBack3]);

//route
//prettier-ignore
app.route('/testRoute')
  .get((req, res) => {
    res.send(req.method);
  })
  .post((req, res) => {
    res.send(req.method);
  })
  .delete((req, res) => {
    res.send(req.method);
  });

app.listen(3000, () => {
  console.log('API started.');
});
