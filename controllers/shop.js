const Product = require("../models/product");
// const Cart = require("./../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
  console.log(prodId);
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
  Product.fetchAll()
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
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
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

// exports.getOrders = (req, res, next) => {
//   res.render("shop/orders", {
//     path: "/orders",
//     pageTitle: "Your Orders",
//   });
// };

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };

exports.postDeleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteCartItem(prodId)
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};
