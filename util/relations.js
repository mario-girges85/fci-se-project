const User = require("../models/user");
const Cart = require("../models/cart");
const Meal = require("../models/meal");
const CartItem = require("../models/cart_Item");

//user to cart => one to one
User.hasOne(Cart, { foreignKey: "userid", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userid" });

//cart to cartitem => one to many
Cart.hasMany(CartItem, { foreignKey: "cartid", onDelete: "CASCADE" });
CartItem.belongsTo(Cart, { foreignKey: "cartid" });

//meal to cartitem => one to many
Meal.hasMany(CartItem, { foreignKey: "mealid", onDelete: "CASCADE" });
CartItem.belongsTo(Meal, { foreignKey: "mealid" });

module.exports = { User, Cart, Meal, CartItem };
