const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// const getDb = require("../util/database").getDb;
// const mongodb = require("mongodb");

// class Product {
//   constructor(title, imageUrl, price, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }
//   save() {
//     const db = getDb();
//     let operation;
//     if (this._id) {
//       console.log("here");
//       operation = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       operation = db.collection("products").insertOne(this);
//     }
//     return operation.then((result) => result).catch((err) => console.log(err));
//   }
//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((result) => result)
//       .catch((err) => console.log(err));
//   }
//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }
//   static deleteOne(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }
// }

module.exports = mongoose.model("Product", productSchema);
