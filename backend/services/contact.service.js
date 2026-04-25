import ContactModel from "../models/contact.model.js";

export class ContactService {
  static saveMessage = async (data) => {
    const contact = await ContactModel.create(data);
    return contact;
  };
}
