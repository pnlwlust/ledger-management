import mongoose from 'mongoose';

const connectDataBase = async (dbConfig) => {
  let url = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.databaseName}`;

  if (dbConfig.username && dbConfig.password) {
    url = `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.databaseName}?authSource=admin`;
  }

  const db = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true
  });

  return db;
};

export default connectDataBase;
