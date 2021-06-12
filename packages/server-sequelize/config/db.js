export default {
  development: {
    host: "localhost",
    port: 3306,
    databaseName: "ledger_management",
    username: "",
    password: "",
  },
  production: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    databaseName: process.env.MYSQL_DB,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  },
  test: {
    host: "localhost",
    port: 3306,
    databaseName: "ledger_management",
    username: "",
    password: "",
  },
};
