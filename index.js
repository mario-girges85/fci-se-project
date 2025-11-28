require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/db");
const usersRouter = require("./routers/users");
const { isAuth } = require("./middleware/is-auth");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", usersRouter);
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
