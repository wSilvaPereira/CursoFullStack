import mongoose from 'mongoose';

async function connectMongoose() {
  await mongoose.connect(
    'mongodb+srv://williampereira:19william84@cluster0.pt00x.mongodb.net/grades?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}
try {
  connectMongoose();
  mongoose.pluralize(null);
  console.log('Conectado ao Mongo DB Atlas.');
} catch (error) {
  console.log(`Erro ao conectar no Mongo DB Atlas ${error}`);
}
//Criação do modelo
const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  lastModified: { type: Date, default: new Date() },
});

//Definindo o modelo da coleção
mongoose.model('student', studentSchema);

const student = mongoose.model('student');

new student({
  name: 'Paulo Assis',
  subject: 'Matemática',
  type: 'Trabalho Prático',
  value: 22,
})
  .save()
  .then(() => {
    console.log('Documento inserido');
  })
  .catch((err) => {
    console.log(err);
  });
