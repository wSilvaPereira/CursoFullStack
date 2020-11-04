const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://williampereira:19william84@cluster0.pt00x.mongodb.net/<dbname>?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  // const collection = client.db('grades').collection('student');

  // const documents = await collection.find({ subject: 'Física' }).toArray();
  // console.log(documents);

  const databaseList = await client.db().admin().listDatabases();
  // console.log(databaseList.databases);

  databaseList.databases.forEach((db) => {
    console.log(db.name);
  });

  client.close();
});
