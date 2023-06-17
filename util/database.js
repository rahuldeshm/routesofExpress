const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "rahuldb",
  password: "Rahul123",
});

module.exports = pool.promise();
