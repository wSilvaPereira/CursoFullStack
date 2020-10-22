import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();
router.use(express.json());

function getCaminhoPorEscopoChave(escopo, chave, seq = 0) {
  let caminhoEscopo = '';
  let caminhoLivro = '';

  pdf;

  const escopoTratado = escopo.toString().toLowerCase();

  if (escopoTratado.includes('assdig')) {
    caminhoEscopo = 'Arquivos';
    caminhoLivro = escopo.slice('assdig'.length, escopo.length);
  } else if (escopoTratado.includes('dig')) {
    caminhoEscopo = 'Digitalização';
    caminhoLivro = escopo.slice('dig'.length, escopo.length);
  } else if (escopoTratado.includes('anx')) {
    caminhoEscopo = 'Anexos';
    caminhoLivro = escopo.slice('anx'.length, escopo.length);
  }

  let caminhoChave = chave.toString();

  if (caminhoLivro.toLowerCase().includes('l5')) {
    caminhoChave = caminhoChave + '/' + seq.toString();
  }

  return (
    'C:/TempEscriba/imagens-api/' +
    caminhoEscopo +
    '/' +
    caminhoLivro +
    '/' +
    caminhoChave
  );
}

router.get('/', async (req, res, next) => {
  try {
    const { escopo, chave, seq } = req.body;

    const caminhoEscopoChave = getCaminhoPorEscopoChave(escopo, chave, seq);

    const files = await fs.readdir(caminhoEscopoChave);

    const imagens = [];

    for (let i = 0; i < files.length; i++) {
      const fileBase64 = await fs.readFile(
        caminhoEscopoChave + '/' + files[i],
        'base64'
      );
      imagens.push({ nome: files[i], Base64: fileBase64 });
    }

    const resultado = { resultado: true, imagens };

    res.send(resultado);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { img_descricao, img } = req.body.img[0];
    const { escopo, chave, seq } = req.body;

    const caminhoEscopoChave = getCaminhoPorEscopoChave(escopo, chave, seq);
    await fs.mkdir(caminhoEscopoChave, { recursive: true });
    const caminhoCompleto = `${caminhoEscopoChave}/${img_descricao}`;

    var buf = Buffer.from(img, 'base64');
    await fs.writeFile(caminhoCompleto, buf);

    const result = {
      resultado: true,
      imagem: [
        {
          escopo: escopo,
          chave: chave,
          seq: seq,
          arquivo: img_descricao,
        },
      ],
    };

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
  res.end();
});

router.delete('/', (req, res, next) => {
  try {
    const { escopo, chave, seq, descricao } = req.body;
    const caminhoEscopoChave = getCaminhoPorEscopoChave(escopo, chave, seq);

    const caminhoCompleto = `${caminhoEscopoChave}/${descricao}`;

    fs.unlink(caminhoCompleto);

    const result = {
      resultado: true,
    };

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.use((error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

export default router;
