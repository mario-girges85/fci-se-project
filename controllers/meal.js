const { Meal } = require("../util/relations");

module.exports.new_meal = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
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
    return res.status(201).send({ message: "Meal created successfully", meal });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.get_all_meals = async (req, res) => {
  try {
    const meals = await Meal.findAll();
    return res
      .status(200)
      .send({ message: "All meals fetched successfully", meals });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.get_meal_by_category = async (req, res) => {
  try {
    const category = req.query.category;
    const meals = await Meal.findAll({ where: { category: category } });
    return res
      .status(200)
      .send({ message: "Meals by category fetched successfully", meals });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.get_meal_by_id = async (req, res) => {
  try {
    const id = req.query.id;
    const meal = await Meal.findByPk(id);
    if (!meal) {
      return res.status(404).send({ message: "Meal not found" });
    }
    return res
      .status(200)
      .send({ message: "Meal by id fetched successfully", meal });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.update_meal = async (req, res) => {
  try {
    const { id, name, description, price, image, category } = req.body;

    if (!id || !name || !description || !price || !image || !category) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const meal = await Meal.findByPk(id);
    if (!meal) {
      return res.status(404).send({ message: "Meal not found" });
    }
    await meal.update({ name, description, price, image, category });
    return res.status(200).send({ message: "Meal updated successfully", meal });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.delete_meal = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).send({ message: "Id is required" });
    }
    const meal = await Meal.findByPk(id);
    if (!meal) {
      return res.status(404).send({ message: "Meal not found" });
    }
    await meal.destroy();
    return res.status(200).send({ message: "Meal deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
