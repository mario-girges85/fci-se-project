const sequelize = require("../util/db");
const User = require("../models/user");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    await User.destroy({ where: {}, truncate: true });
    console.log("All users deleted successfully.");
  } catch (err) {
    console.error("Error while deleting all users:", err);
  } finally {
    await sequelize.close();
    console.log("Database connection closed.");
  }
})();
