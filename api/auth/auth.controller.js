const UserDB = require("./auth.model");
const bcrypt = require("bcrypt");
const { createVerificationToken } = require("../../services/token.service");

const registrationController = async (req, res, next) => {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body.password, +process.env.SALT);
    await UserDB.createUser({
      ...body,
      password: hashedPassword,
    });
    res.status(201).send("Created");
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
      return res.status(404).send(`Wrong password`);
    }
    const access_token = await createVerificationToken({ id: user._id });
    res.json({ access_token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationController,
  loginController,
};
