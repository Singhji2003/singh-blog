import mongoose from "mongoose";

const BlogsSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    link: {
      type: String,
    },
    category: {
      type: String,
    },
    htmlBody: {
      type: String,
    },
    image: {
      type: String,
    },
    keywords: {
      type: String,
    },
    faq: [
      {
        question: {
          type: String,
        },
        answer: {
          type: String,
        },
      },
    ],
  },
  {
    timestamp: true,
  },
);

const BlogModel = mongoose.model("blog", BlogsSchema);

export default BlogModel;
