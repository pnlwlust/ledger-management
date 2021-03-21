export default {
  development: {
    host: 'localhost',
    port: 27017,
    databaseName: 'ledger_management',
    username: '',
    password: ''
  },
  production: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    databaseName: process.env.MONGO_DB,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD
  },
  test: {
    host: 'localhost',
    port: 27017,
    databaseName: 'ledger_management',
    username: '',
    password: ''
  }
};
