const { Router } = require("express");
const {
  registrationController,
  loginController,
  logoutController,
} = require("./auth.controller");
const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");

const authRouter = Router();

authRouter.post("/register", registrationController);
authRouter.post("/login", loginController);
authRouter.post("/logout", checkAuthTokenMiddleware, logoutController);

module.exports = authRouter;
