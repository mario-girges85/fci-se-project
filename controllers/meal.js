const Meal = require("../models/meal");
module.exports.addMeal = async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    const category = req.body.category;

    if (!name || !description || !price || !image || !category) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const meal = await Meal.create({
      name,
      description,
      price,
      image,
      category,
    });
    res.status(201).send({ message: "Meal added successfully", meal });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};
