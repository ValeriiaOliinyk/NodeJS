const { Router } = require("express");
const {
  getCurrentUserController,
  updateSubscriptionContoller,
  getUsersBySubscription,
  uploadAvatar,
  updateAvatarController,
} = require("./users.controller");
const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");
const {
  avatarUpLoaderMiddleware,
} = require("../../middlewares/fileUploader.middleware");

const usersRouter = Router();

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);
usersRouter.patch("/", checkAuthTokenMiddleware, updateSubscriptionContoller);
usersRouter.get("/", checkAuthTokenMiddleware, getUsersBySubscription);
usersRouter.post(
  "/uploadAvatar",
  checkAuthTokenMiddleware,
  avatarUpLoaderMiddleware,
  uploadAvatar
);

usersRouter.patch(
  "/avatars",
  checkAuthTokenMiddleware,
  avatarUpLoaderMiddleware,
  updateAvatarController
);

module.exports = usersRouter;
