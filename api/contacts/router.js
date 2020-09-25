const { Router } = require("express");
const {
  getContactsController,
  getContactController,
  createContactsController,
  updateContactsController,
  deleteContactController,
} = require("./contacts-controller");

const contactsRouter = Router();

// GET

contactsRouter.get("/", getContactsController);

// GET /:contactId
contactsRouter.get("/:contactId", getContactController);

// POST

contactsRouter.post("/", createContactsController);

// PATCH

contactsRouter.patch("/", updateContactsController);

// DELETE

contactsRouter.delete("/:contactId", deleteContactController);

module.exports = contactsRouter;
