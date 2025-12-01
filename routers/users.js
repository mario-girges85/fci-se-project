const express = require("express");
const Router = express.Router();
const {
  createUser,
  login,
  getallusers,
  deleteuser,
} = require("../controllers/user");
const { isAdmin } = require("../middleware/is-auth");
Router.post("/add-user", createUser);

Router.post("/login", login);

Router.get("/get-all-users", isAdmin, getallusers);
Router.delete("/delete-user", isAdmin, deleteuser);
module.exports = Router;
