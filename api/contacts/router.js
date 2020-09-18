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
  res.status(404).json({ message: "Not found" });
});

// POST /api/contacts

contactsRouter.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    const contact = await Contacts.addContact(name, email, phone);
    res.status(201).json(contact);
    return;
  }
  res.status(400).json({ message: "Missing required name field" });
  return;
});

// DELETE /api/contacts/:contactId

contactsRouter.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const getContact = await Contacts.getContactById(+contactId);

  if (getContact) {
    const contact = await Contacts.removeContact(+contactId);
    res.status(200).json({ message: "Contact deleted" });
    return;
  }
  res.status(404).json({ message: "Not found" });
});

// PATCH /api/contacts/:contactId

contactsRouter.patch("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.getContactById(+contactId);

  if (!contact) {
    res.status(400).json({ message: `Missing fields` });
    return;
  }

  if (contact) {
    const updatedContact = await Contacts.updateContact(+contactId, req.body);
    res.status(200).json(updatedContact);
    return;
  }

  res.status(404).json({ message: "Not found" });
});

module.exports = contactsRouter;
