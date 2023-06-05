const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  //since we have already defined a path to where to templating engine files is stored
  //in app.js. we just name the name of the templating engine here in the first argument below,
  //the second argument is the data we are passing to this view
  res.render("add-product", { pageTitle: "Add Product", path: '/admin/add-product' });
  //don't call next after you've sent a response becus this will cause an error
  //as sending a response means closing the process
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
