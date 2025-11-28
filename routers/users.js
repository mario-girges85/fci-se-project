const express = require("express");
const Router = express.Router();
const { createUser, login, getallusers } = require("../controllers/user");
Router.post("/add-user", createUser);

Router.post("/login", login);

Router.get("/get-all-users", getallusers);

module.exports = Router;
