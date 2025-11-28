const Sequelize = require("sequelize");
const sequelize = require("../util/db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user",
  },
  image: {
    type: Sequelize.BLOB,
    allowNull: true,
  },
  gender: {
    type: Sequelize.ENUM("male", "female"),
    allowNull: true,
  },
});
module.exports = User;
