const { Cart, CartItem, Meal } = require("../util/relations");

// Helper to fetch or create the user's cart based on the auth token
const getOrCreateCart = async (userId) => {
  const [cart] = await Cart.findOrCreate({ where: { userid: userId } });
  return cart;
};

module.exports.add_to_cart = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userid;
    const { mealid, quantity = 1 } = req.body;

    if (!userId || !mealid) {
      return res
        .status(400)
        .send({ message: "userid (from token) and mealid are required" });
    }

    if (quantity < 1) {
      return res.status(400).send({ message: "quantity must be at least 1" });
    }

    const meal = await Meal.findByPk(mealid);
    if (!meal) {
      return res.status(404).send({ message: "Meal not found" });
    }

    const cart = await getOrCreateCart(userId);

    // This code tries to find a cart item with the same cart ID and meal ID.
    // If it doesn't exist, it creates a new cart item with the provided quantity.
    // The result is an array: [item, created]
    // - item: the CartItem instance (existing or newly created)
    // - created: true if a new item was created, false if it already existed
    const [item, created] = await CartItem.findOrCreate({
      where: { cartid: cart.id, mealid },
      defaults: { quantity },
    });

    if (!created) {
      // If the item already exists, update the quantity
      await item.update({ quantity: item.quantity + quantity });
    }

    return res.status(200).send({
      message: created ? "Item added to cart" : "Item quantity updated",
      item,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message || err });
  }
};

module.exports.get_cart = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userid;

    if (!userId) {
      return res
        .status(400)
        .send({ message: "userid (from token or query) is required" });
    }

    // The 'include' option below tells Sequelize to eagerly load associated models:
    // - It gets all CartItem entries associated with the Cart (using the model reference).
    // - For each CartItem, it also loads the related Meal model data.
    // This means: When fetching a Cart, you'll also receive all its items,
    // and for each item, full details of the associated meal will be included in the result.
    const cart = await Cart.findOne({
      where: { userid: userId },
      include: [{ model: CartItem, include: [Meal] }],
    });
    if (!cart) {
      return res.status(200).send({ message: "Cart is empty", cart: null });
    }

    const total = cart.cart_items?.reduce((sum, item) => {
      const price = item.meal?.price || 0;
      return sum + price * item.quantity;
    }, 0);

    return res
      .status(200)
      .send({ message: "Cart fetched successfully", cart, total });
  } catch (err) {
    return res.status(500).send({ message: err.message || err });
  }
};

module.exports.update_cart_item = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userid;
    const { mealid, quantity } = req.body;

    if (!userId || !mealid || quantity == null) {
      return res
        .status(400)
        .send({ message: "userid, mealid and quantity are required" });
    }

    if (quantity < 1) {
      return res.status(400).send({ message: "quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ where: { userid: userId } });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    const item = await CartItem.findOne({
      where: { cartid: cart.id, mealid },
    });

    if (!item) {
      return res.status(404).send({ message: "Item not found in cart" });
    }

    await item.update({ quantity });

    return res
      .status(200)
      .send({ message: "Cart item updated successfully", item });
  } catch (err) {
    return res.status(500).send({ message: err.message || err });
  }
};

module.exports.remove_cart_item = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userid;
    const { mealid } = req.body;

    if (!userId || !mealid) {
      return res
        .status(400)
        .send({ message: "userid and mealid are required" });
    }

    const cart = await Cart.findOne({ where: { userid: userId } });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    const deleted = await CartItem.destroy({
      where: { cartid: cart.id, mealid },
    });

    if (!deleted) {
      return res.status(404).send({ message: "Item not found in cart" });
    }

    return res.status(200).send({ message: "Cart item removed successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message || err });
  }
};

module.exports.clear_cart = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userid;

    if (!userId) {
      return res.status(400).send({ message: "userid is required" });
    }

    const cart = await Cart.findOne({ where: { userid: userId } });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    await CartItem.destroy({ where: { cartid: cart.id } });

    return res.status(200).send({ message: "Cart cleared successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message || err });
  }
};
