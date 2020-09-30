const { Router } = require("express");
const {
  registrationController,
  loginController,
} = require("./auth.controller");

const authRouter = Router();

authRouter.post("/register", registrationController);
authRouter.post("/login", loginController);

module.exports = authRouter;
