const { verifyToken } = require("../services/token.service");
const User = require("../api/auth/auth.model");

const checkAuthTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      res.status(401).send("Unauthorized");
    }
    const data = await verifyToken(token);
    req.user = data.id;
    const userInfo = await User.findUserById(data.id);
    req.userInfo = {
      email: userInfo.email,
      id: userInfo._id,
      subscription: userInfo.subsription,
    };
    next();
  } catch (e) {
    res.status(401).send("Unauthorized");
  }
};

// const checkUserRole = (roles) => (req, res, next) => {
//   const isValidRole = roles.includes(req.userInfo.role);
//   if (isValidRole) return next();
//   res.status(403).send("Forbidden");
// };

module.exports = {
  checkAuthTokenMiddleware,
  // checkUserRole,
};
