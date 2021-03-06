const UserDB = require("../users/users.model");
const bcrypt = require("bcrypt");
const {
  createVerificationToken,
  createVerificationTokenEmail,
} = require("../../services/token.service");
const {
  createAvatar,
  updateUserAvatar,
} = require("../../services/avatar.service");
const { sendMail } = require("../../services/mail.service");

const registrationController = async (req, res, next) => {
  try {
    const { body } = req;
    const token = await createVerificationTokenEmail();
    await sendMail(body.email, token);
    const hashedPassword = await bcrypt.hash(body.password, +process.env.SALT);
    const newUser = await UserDB.createUser({
      ...body,
      password: hashedPassword,
      verificationToken: token,
    });
    const id = await UserDB.findUserByEmail({ email: body.email });
    await createAvatar(id._id);
    const userUpdate = await updateUserAvatar(id._id);
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: userUpdate.avatarURL,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).send("Email in use");
    }
    res.status(400).send("Ошибка от Joi или другой валидационной библиотеки");
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await UserDB.findUserByEmail({ email });
    if (!user) {
      return res.status(404).send(`Email or password is wrong`);
    }
    const isPasswordsEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordsEqual) {
      return res.status(401).send(`Email or password is wrong`);
    }
    const accessToken = await createVerificationToken({ id: user._id });

    await UserDB.updateUser(user._id, {
      token: accessToken,
    });

    res.status(200).json({
      token: accessToken,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ошибка от Joi или другой валидационной библиотеки" });
  }
};

const logoutController = async (req, res, next) => {
  try {
    const { user: id } = req;
    const currentUserById = await UserDB.findUserById(id);
    if (!currentUserById) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    await UserDB.updateUser(id, {
      token: "",
    });

    return res.status(204).send("No Content");
  } catch (error) {
    next(error);
  }
};

const verificationTokenController = async (req, res, next) => {
  const {
    params: { verificationToken },
  } = req;
  try {
    const user = await UserDB.findUserByToken({ verificationToken });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    await UserDB.updateUser(user.id, { verificationToken: null });
    res.status(200).send("OK");
  } catch (error) {
    res.status(404).json({ message: "User not found" });
    next(error);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  verificationTokenController,
};
