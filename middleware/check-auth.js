const jwt = require("jsonwebtoken");
const config = require("config");

const JWT_KEY = config.get("JWT_KEY");

module.exports = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);

    const decoded = jwt.verify(token, JWT_KEY);

    req.userData = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};

const getTokenFromHeader = () => {
  return "asdf";
};
