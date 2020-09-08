const Users = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      Users.listContacts().then((users) => console.table(users));
      break;

    case "get":
      Users.getContactById(id).then((user) => console.log(user));
      break;

    case "add":
      Users.addContact(name, email, phone).then((user) => console.log(user));
      break;

    case "remove":
      Users.removeContact(id).then((users) => console.table(users));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
