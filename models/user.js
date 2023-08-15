const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
  addToCart(product) {
    const i = this.cart.items.findIndex((e) => product._id.equals(e.productId));
    console.log(i, ">>>>>");
    let updatedCart;
    if (i === -1) {
      updatedCart = {
        items: [
          ...this.cart.items,
          { productId: new mongodb.ObjectId(product._id), quantity: 1 },
        ],
      };
    } else {
      const updateditems = [...this.cart.items];
      updateditems[i] = {
        productId: new mongodb.ObjectId(product._id),
        quantity: this.cart.items[i].quantity + 1,
      };
      updatedCart = {
        items: updateditems,
      };
    }
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }
  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then((result) => result)
      .catch((err) => console.log(err));
  }
}

module.exports = User;
