const { Router } = require("express");
const {
  registrationController,
  loginController,
  logoutController,
} = require("./auth.controller");
const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");
const {
  registrationValidatorMiddleware,
  loginValidatorMiddleware,
} = require("./auth.validator");

const authRouter = Router();

authRouter.post(
  "/register",
  registrationValidatorMiddleware,
  registrationController
);

authRouter.post("/login", loginValidatorMiddleware, loginController);
authRouter.post("/logout", checkAuthTokenMiddleware, logoutController);

module.exports = authRouter;
