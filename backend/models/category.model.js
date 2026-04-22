import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    articleCount: {
      type: Number,
    },
    icon: {
      type: String,
    },
    iconBg: {
      type: String,
    },
    iconColor: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const CategoryModel = mongoose.model("categoryModel", categorySchema);

export default CategoryModel;
