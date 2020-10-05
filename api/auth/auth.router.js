const { Router } = require("express");
const {
  registrationController,
  loginController,
  getCurrentUserController,
  logoutController,
} = require("./auth.controller");
const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");

const authRouter = Router();

authRouter.post("/register", registrationController);
authRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);
authRouter.post("/login", loginController);
authRouter.post("/logout", checkAuthTokenMiddleware, logoutController);

module.exports = authRouter;
