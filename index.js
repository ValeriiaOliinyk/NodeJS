const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4040;

const express = require("express");
const contactsRouter = require("./api/contacts/router");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());

app.use("/contacts", contactsRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
