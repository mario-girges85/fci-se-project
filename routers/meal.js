const express = require("express");
const Router = express.Router();
const {
  new_meal,
  get_all_meals,
  get_meal_by_category,
  get_meal_by_id,
  update_meal,
  delete_meal,
} = require("../controllers/meal");

Router.post("/new-meal", new_meal);
Router.get("/get-all-meals", get_all_meals);
Router.get("/get-meal-by-category", get_meal_by_category);
Router.get("/get-meal-by-id", get_meal_by_id);
Router.put("/update-meal", update_meal);
Router.delete("/delete-meal", delete_meal);
module.exports = Router;
