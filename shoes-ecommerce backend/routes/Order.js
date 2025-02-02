const express = require("express");
const {
  fetchOrderByUser,
  createOrder,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
} = require("../controller/Order");

const router = express.Router();
//  /auth is already added in base path

router
  .get("/user/:userId", fetchOrderByUser)
  .post("/", createOrder)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder)
  .get("/",fetchAllOrders)
exports.router = router;
