require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/db");
const usersRouter = require("./routers/users");
const mealRouter = require("./routers/meal");
const cartRouter = require("./routers/cart");
const { isAuth } = require("./middleware/is-auth");
const { User, Cart, Meal, CartItem } = require("./util/relations");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/meals", mealRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Hello World from Vercel");
});
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
