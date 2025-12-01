const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.createUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const image = req.body.image;
    const gender = req.body.gender;
    const phonenumber = req.body.phonenumber;

    if (!name || !email || !password || !image || !gender || !phonenumber) {
      return res.status(400).send({ message: "all fields are required" });
    }

    const emailexist = await User.findOne({ where: { email: email } });

    if (emailexist) {
      return res.status(400).send({ message: "email already exists" });
    }
    role = "user";
    if (email === "mario85.girges@gmail.com") {
      role = "admin";
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      image: image,
      gender: gender,
      phonenumber: phonenumber,
      role: role,
    })
      .then(() => {
        return res.status(201).send({ message: "user created successfully" });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).send({ message: "email and password requierd" });
    }

    userbyemail = await User.findOne({ where: { email: email } });
    if (!userbyemail) {
      return res.status(400).send({ message: "invalid email or password 1 " });
    }

    const truepass = await bcrypt.compare(password, userbyemail.password);

    if (truepass) {
      const resdata = {
        id: userbyemail.id,
        name: userbyemail.name,
        email: userbyemail.email,
        image: userbyemail.image,
        role: userbyemail.role,
      };

      const token = jwt.sign(resdata, process.env.JWT_SECRET);

      return res
        .status(200)
        .send({ message: "logged in successfully ", token: token });
    } else {
      return res.status(400).send({ message: "invalid email or password 2 " });
    }
  } catch (err) {
    console.log("error while login : ", err);
  }
};

module.exports.getallusers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.status(200).send({ message: "all users", users: users });
  } catch (err) {
    console.log("error while getting all users : ", err);
    return res.status(500).send({ message: "error while getting all users" });
  }
};

module.exports.deleteuser = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      return res.status(400).send({ message: "id is required" });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }
    await user.destroy();
    return res.status(200).send({ message: "user deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
