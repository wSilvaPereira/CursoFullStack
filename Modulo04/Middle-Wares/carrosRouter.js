import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Get /carros');
  res.send('Get /carros');
});

router.get('/precos', (req, res) => {
  console.log('Get /carros/precos');
  res.send('Get /carros/precos');
});

export default router;
