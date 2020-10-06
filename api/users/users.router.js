const { Router } = require("express");
const {
  getCurrentUserController,
  updateSubscriptionContoller,
} = require("./users.controller");
const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");

const usersRouter = Router();

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);
usersRouter.patch("/", checkAuthTokenMiddleware, updateSubscriptionContoller);

module.exports = usersRouter;
