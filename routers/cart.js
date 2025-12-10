const express = require("express");
const Router = express.Router();
const { isAuth } = require("../middleware/is-auth");
const {
  add_to_cart,
  get_cart,
  update_cart_item,
  remove_cart_item,
  clear_cart_items,
} = require("../controllers/cart");

Router.post("/add", isAuth, add_to_cart);
Router.get("/", isAuth, get_cart);
Router.put("/item", isAuth, update_cart_item);
Router.delete("/item", isAuth, remove_cart_item);
Router.delete("/clear", isAuth, clear_cart_items);

module.exports = Router;
