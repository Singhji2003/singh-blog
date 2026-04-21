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
    followers: [
      {
        type: String,
      },
    ],

    likedBlogs: [
      {
        type: String,
      },
    ],
    following: [
      {
        type: String,
      },
    ],
    visitedBlog: [
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
