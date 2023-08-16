const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((rows) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then((row) => {
    res.render("shop/product-detail", {
      product: row,
      pageTitle: row.title,
      path: "/products",
    });
  });
};
//
exports.getIndex = (req, res, next) => {
  Product.find()
    .then((rows) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId", "title -_id")
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products.cart.items,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
    })
    .then(res.redirect("/cart"))
    .catch((err) => console.log(err));
};
exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((products) => {
      const order = new Order({
        items: products.cart.items,
        user: {
          userId: req.user._id,
          name: req.user.name,
        },
      });
      return order.save();
    })
    .then((r) => {
      req.user
        .removeCartItems()
        .then((result) => {
          res.redirect("/orders");
        })
        .catch((err) => console.log(err));
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .exec()
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteCartItem(prodId)
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};
