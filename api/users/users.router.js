const { Router } = require("express");
const {
  getCurrentUserController,
  updateSubscriptionContoller,
  getUsersBySubscription,
} = require("./users.controller");
const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");

const usersRouter = Router();

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);
usersRouter.patch("/", checkAuthTokenMiddleware, updateSubscriptionContoller);
usersRouter.get("/", checkAuthTokenMiddleware, getUsersBySubscription);

module.exports = usersRouter;
