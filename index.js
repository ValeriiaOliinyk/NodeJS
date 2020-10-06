const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4040;
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./api/auth/auth.router");
const contactsRouter = require("./api/contacts/router");
const usersRouter = require("./api/users/users.router");

const runServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.log("Error");
    process.exit(1);
  }

  const app = express();

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/contacts", contactsRouter);
  app.use("/users", usersRouter);

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

runServer();
