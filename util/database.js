// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "rahuldb",
//   password: "Rahul123",
// });

// module.exports = pool.promise();

const Sequelize = require("sequelize");
const sequelize = new Sequelize("rahuldb", "root", "Rahul123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
