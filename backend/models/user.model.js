import mongoose from "mongoose";

const userScheama = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },

    savedBlogs: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("user", userScheama);

export default UserModel;
