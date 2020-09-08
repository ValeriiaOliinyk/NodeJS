const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  const usersData = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(usersData);
}

async function getContactById(contactId) {
  const users = await listContacts();
  return users.find((user) => contactId === user.id);
}

async function removeContact(contactId) {
  const users = await listContacts();
  const result = users.filter((user) => contactId !== user.id);
  fs.writeFile(contactsPath, JSON.stringify(result));
  return result;
}

async function addContact(name, email, phone) {
  const users = await listContacts();
  const id = users.length > 0 ? [...users].pop().id + 1 : 1;
  const newUser = { id, name, email, phone };
  users.push(newUser);
  const usersData = JSON.stringify(users);
  fs.writeFile(contactsPath, usersData);
  return newUser;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
