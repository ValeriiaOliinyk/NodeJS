const { Router } = require("express");
const {
  getCurrentUserController,
  updateSubscriptionContoller,
  getUsersBySubscription,
  uploadImage,
} = require("./users.controller");
const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");
const {
  imageUploaderMiddleware,
} = require("../../middlewares/fileUploader.middleware");

const usersRouter = Router();

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);
usersRouter.patch("/", checkAuthTokenMiddleware, updateSubscriptionContoller);
usersRouter.get("/", checkAuthTokenMiddleware, getUsersBySubscription);
usersRouter.post(
  "/images",
  checkAuthTokenMiddleware,
  imageUploaderMiddleware,
  uploadImage
);

module.exports = usersRouter;
