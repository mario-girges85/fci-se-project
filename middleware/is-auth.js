const jwt = require("jsonwebtoken");
module.exports.isAuth = (req, res, next) => {
  try {
    const tokenheader = req.headers.authorization.split(" ")[1];

    if (!tokenheader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // const token = tokenheader.split(" ")[1];
    if (!tokenheader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(tokenheader, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports.isAdmin = (req, res, next) => {
  try {
    const tokenheader = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(tokenheader, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this resource" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
