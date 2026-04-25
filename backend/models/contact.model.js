import mongoose from "mongoose";

const ContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamp: true,
  },
);

const ContactModel = mongoose.model("Contact", ContactSchema);
export default ContactModel;
