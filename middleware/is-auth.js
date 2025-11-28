const jwt = require("jsonwebtoken");
module.exports.isAuth = (req, res, next) => {
  try {
    const tokenheader = req.headers.authorization;
    if (!tokenheader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // const token = tokenheader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
