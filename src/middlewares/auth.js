const jwt = require("jsonwebtoken");
const result = require("dotenv").config({ path: "./configs/.env" });

module.exports = (req, res, next) => {
  if (result.error) {
    throw res.status(401).json({
      error: new Error("Process invalid!"),
    });
  }
  const token =
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Auth Error" });
  try {
    const decodedToken = jwt.verify(token, process.env.MIDDLEWARE_KEY);
    req.user = decodedToken.user;
    next();
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
