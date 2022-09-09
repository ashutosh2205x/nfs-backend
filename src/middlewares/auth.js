const jwt = require("jsonwebtoken");
const { MIDDLEWARE_KEY } = require("../key");

module.exports = (req, res, next) => {
  const token =
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Auth Error" });
  try {
    const decodedToken = jwt.verify(token, MIDDLEWARE_KEY);
    req.user = decodedToken.user;
    next();
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
