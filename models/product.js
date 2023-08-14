const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class Product {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }
  save() {
    const db = getDb();
    let operation;
    if (this._id) {
      operation = db.collection("products").updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        {
          $set: {
            title: this.title,
            price: this.price,
            description: this.description,
            imageUrl: this.imageUrl,
          },
        }
      );
    } else {
      operation = db.collection("products").insertOne(this);
    }
    return operation
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }
  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }
  static deleteOne(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
