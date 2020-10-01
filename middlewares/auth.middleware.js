const { verifyToken } = require("../services/token.service");

const checkAuthTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      res.status(401).send("Unauthorized");
    }
    const data = await verifyToken(token);
    req.userId = data.id;
    next();
  } catch (e) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
  checkAuthTokenMiddleware,
};
