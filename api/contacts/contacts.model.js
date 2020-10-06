const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { versionKey: false }
);

class Contacts {
  constructor() {
    this.db = mongoose.model("Contacts", contactSchema);
  }

  getContacts = async (query) => {
    const { limit, page, sub: subscription, ...otherQuery } = query;
    console.log(subscription);
    if (subscription) {
      const info = await this.db.find({ subscription });
      console.log(info);
    }
    const skipItems = (page - 1) * limit;
    return await this.db
      .find(otherQuery)
      .skip(skipItems)
      .limit(+limit);
  };

  getContactById = async (contactId) => {
    return await this.db.findById(contactId);
  };

  createContact = async (contactData) => {
    return await this.db.create(contactData);
  };

  updateContacts = async (contactId, contactData) => {
    return await this.db.findByIdAndUpdate(contactId, contactData, {
      new: true,
    });
  };

  deleteContact = async (contactId) => {
    return await this.db.findByIdAndRemove(contactId);
  };
}

module.exports = new Contacts();
