const express = require("express");
const router = express.Router();
const {
 
} = require("../controller/Product");
const { fetchCartByUser, addToCart, deleteFromCart, updateCart } = require("../controller/Cart");

router
  .get("/", fetchCartByUser)
  .post("/", addToCart)
  .delete("/:id", deleteFromCart)
  .patch("/:id",updateCart)

exports.router = router;
