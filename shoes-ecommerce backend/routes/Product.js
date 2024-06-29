const express = require("express");
const router = express.Router();
const {
  fetchAllProduct,
  fetchProductsByCategoty,
  createProduct,
  updateProduct,
  fetchProductsById,
} = require("../controller/Product");

router
  .get("/", fetchAllProduct)
  .get("/:id", fetchProductsById)
  .post("/", createProduct)
  .patch("/:id", updateProduct);

exports.router = router;
