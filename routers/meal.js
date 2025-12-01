const express = require("express");
const Router = express.Router();
const { isAdmin } = require("../middleware/is-auth");
const {
  new_meal,
  get_all_meals,
  get_meal_by_category,
  get_meal_by_id,
  update_meal,
  delete_meal,
} = require("../controllers/meal");

Router.post("/new-meal", isAdmin, new_meal);
Router.get("/get-all-meals", get_all_meals);
Router.get("/get-meal-by-category", get_meal_by_category);
Router.get("/get-meal-by-id", get_meal_by_id);
Router.put("/update-meal", isAdmin, update_meal);
Router.delete("/delete-meal", isAdmin, delete_meal);
module.exports = Router;
