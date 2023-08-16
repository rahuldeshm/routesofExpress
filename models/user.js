const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const i = this.cart.items.findIndex((e) => product._id.equals(e.productId));
  let updatedCartItems = [...this.cart.items];
  if (i === -1) {
    updatedCartItems.push({
      productId: product._id,
      quantity: 1,
    });
  } else {
    updatedCartItems[i].quantity++;
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteCartItem = function (prodId) {
  const updatedCart = this.cart.items.filter(
    (e) => e.productId.toString() !== prodId.toString()
  );
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeCartItems = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
