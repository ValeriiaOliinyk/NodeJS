const UserDB = require("./users.model");

const getCurrentUserController = async (req, res, next) => {
  try {
    const { user: id } = req;
    const currentUserById = await UserDB.findUserById(id);
    if (!currentUserById.token) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    res.status(200).json({
      email: currentUserById.email,
      subscription: currentUserById.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscriptionContoller = async (req, res, next) => {
  try {
    const { user: id } = req;
    const {
      body: { subscription },
    } = req;
    const userById = await UserDB.findUserById(id);

    if (!userById.token) {
      res.status(401).json({ message: "No autorization" });
      return;
    }
    const allowedSubscriptionValues = ["free", "pro", "premium"];

    if (!allowedSubscriptionValues.includes(subscription)) {
      res.status(400).json({
        message: "Subscription not valid",
      });
      return;
    }
    const updateUserSub = await UserDB.updateUser(userById._id, {
      subscription,
    });
    return res.status(200).json({
      email: updateUserSub.email,
      subscription: updateUserSub.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const getUsersBySubscription = async (req, res, next) => {
  try {
    const { query } = req;
    const users = await UserDB.getUsers(query);
    if (!users) {
      res.status(400).json({
        message: "Subscription not valid",
      });
    }

    if (users.length < 1) {
      res.status(400).json({
        message: "Users with this subscription not found",
      });
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const file = req.file;
    const { user: id } = req;
    const userById = await UserDB.findUserById(id);
    res.end(
      `${process.env.HOST + ":" + process.env.PORT}/images/${file.filename}`
    );
    await UserDB.updateUser(userById._id, { avatar: file.path });
  } catch (error) {
    next(error);
  }
};

const updateAvatarController = async (req, res, next) => {
  try {
    const { user: id } = req;
    const { file } = req;

    const userById = await UserDB.findUserById(id);

    if (!file) {
      res.status(400).json({
        message: "Avatar was not found",
      });
      return;
    }

    if (!userById.token) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const avatarURL = `${process.env.HOST + ":" + process.env.PORT}/images/${
      file.filename
    }`;

    await UserDB.updateUser(userById._id, {
      avatarURL,
    });

    return res.status(200).json(avatarURL);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUserController,
  updateSubscriptionContoller,
  getUsersBySubscription,
  uploadAvatar,
  updateAvatarController,
};
