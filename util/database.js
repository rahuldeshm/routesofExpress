// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "rahuldb",
//   password: "Rahul123",
// });

// module.exports = pool.promise();

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("rahuldb", "root", "Rahul123", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster0.f5cboss.mongodb.net/mongodatabase?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("CONNECTED");
      _db = client.db(); //db("test") a new database of test name will be created.
      callback();
    })
    .catch((err) => console.log(err));
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "NO DATABASE FOUND";
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
