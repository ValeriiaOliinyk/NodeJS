const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4040;
const Contacts = require("./contacts");

const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("first middleware");
  next();
});

app.use((req, res, next) => {
  console.log("second middleware");
  next();
});

app.get("/contacts", async (req, res) => {
  const contacts = await Contacts.listContacts();
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(contacts));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
