import zlib from 'zlib';
import fs from 'fs';

function zip(filePath) {
  let result = false;
  try {
    // console.log('Lendo...');
    let data = fs.readFileSync(filePath);
    const dataRead64 = data.toString('base64');
    // console.log('Compactando...');
    data = zlib.gzipSync(data, { level: 9 });
    // console.log('Gravando...');
    fs.writeFileSync(`${filePath}.gz`, data);
    // console.log('Descompactando...');
    data = zlib.unzipSync(data);
    // console.log('Gravando...');
    // const ext = filePath.split('.').pop();
    fs.writeFileSync(`${filePath}`, data);
    const dataWrite64 = data.toString('base64');

    if (dataRead64 === dataWrite64) {
      // console.log('Iguais');
      result = true;
    }
  } catch (error) {
    console.log(`Erro ao compactar o arquivo\n ${error}`);
  }
  return result;
}

function compactFilesFromFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  files.forEach((element) => {
    const ext = element.split('.').pop();
    if (ext !== 'gz') {
      const isCompacted = zip(folderPath + '/' + element);
      console.log(
        `${element} - ${isCompacted ? 'Compactado' : 'Não compactado'}`
      );
      // console.log('');
    }
  });
}

// compactFilesFromFolder('C:/PDFs de Teste');
