const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  port: 3308, //default 3306
  user: "root",
  password: "123456",
  database: "webfood",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;
