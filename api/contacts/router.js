const { Router } = require("express");
const {
  getContactsController,
  getContactController,
  createContactsController,
  updateContactsController,
  deleteContactController,
} = require("./contacts-controller");
const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");

const contactsRouter = Router();

// GET

contactsRouter.get("/", checkAuthTokenMiddleware, getContactsController);

// GET /:contactId
contactsRouter.get("/:contactId", getContactController);

// POST

contactsRouter.post("/", createContactsController);

// PATCH

contactsRouter.patch("/", updateContactsController);

// DELETE

contactsRouter.delete("/:contactId", deleteContactController);

module.exports = contactsRouter;
