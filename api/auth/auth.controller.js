const UserDB = require("./auth.model");
const bcrypt = require("bcrypt");

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
      return res.status(404).send(`Email or password is wrong`);
    }
    res.json({ email: user.email, id: user._id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationController,
  loginController,
};
