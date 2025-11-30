const Sequelize = require("sequelize");
const sequelize = require("../util/db");
const CartItem = sequelize.define("cart_item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  cartid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "carts",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  mealid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "meals",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
module.exports = CartItem;
