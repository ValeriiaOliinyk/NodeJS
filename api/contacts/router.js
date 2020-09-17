const { Router } = require("express");
const contacts = require("../../contacts");
const Contacts = require("../../contacts");
const contactsRouter = Router();

// GET /api/contacts

contactsRouter.get("/", async (req, res) => {
  const contacts = await Contacts.listContacts();
  res.status(200).json(contacts);
});

//  GET /api/contacts/:contactId

contactsRouter.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.getContactById(+contactId);
  if (contact) {
    res.status(200).json(contact);
    return;
  }
  res.status(404).send("Not found");
});

// POST /api/contacts

contactsRouter.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  if (typeof name !== "string" || name === "") {
    res.status(400).send("Missing required name field");
    return;
  }

  if (typeof email !== "string" || email === "") {
    res.status(400).send("Missing required email field");
    return;
  }

  if (typeof phone !== "string" || phone === "") {
    res.status(400).send("Missing required phone field");
    return;
  }

  const contact = await Contacts.addContact(name, email, phone);
  res.status(201).json(contact);
});

// DELETE /api/contacts/:contactId

contactsRouter.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const getContact = await Contacts.getContactById(+contactId);

  if (getContact) {
    const contact = await Contacts.removeContact(+contactId);
    res.status(200).send("Contact deleted");
    return;
  }
  res.status(404).send("Not found");
});

// PATCH /api/contacts/:contactId

module.exports = contactsRouter;
