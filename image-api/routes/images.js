import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();
router.use(express.json());

// router.use(express.json({ limit: '10mb', extended: true }));
// router.use(express.urlencoded({ limit: '10mb', extended: true }));

router.get('/', async (req, res) => {
  res.send('Erton');
});

router.post('/', async (req, res) => {
  try {
    const { img_descricao, img } = req.body.img[0];
    console.log(img_descricao);
    var buf = Buffer.from(img, 'base64');
    await fs.writeFile(`${img_descricao}`, buf);
    // res.send('Ok');
  } catch (error) {
    res.send(error);
  }
  res.end();
  // res.send(req.body);
});

export default router;
