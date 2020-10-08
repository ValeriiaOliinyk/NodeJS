const ContactsDB = require("./contacts.model");

const getContactsController = async (req, res, next) => {
  try {
    const { query } = req;
    const contacts = await ContactsDB.getContacts(query);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactsDB.getContactById(contactId);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const createContactsController = async (req, res, next) => {
  try {
    const { body } = req;
    const newContact = await ContactsDB.createContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContactsController = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const updatedContacts = await ContactsDB.updateContacts(id, data);
    res.status(200).json(updatedContacts);
  } catch (error) {
    next(error);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await ContactsDB.deleteContact(contactId);
    res.end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactsController,
  createContactsController,
  updateContactsController,
  deleteContactController,
  getContactController,
};
