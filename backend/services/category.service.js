import CategoryModel from "../models/category.model.js";

export class CategoryService {
  static async getCategory() {
    const data = await CategoryModel.find();
    return data;
  }

  static async getEachCategoryData(data) {
    const { category } = data;
    const categoryData = await CategoryModel.findOne({ id: category });

    return categoryData;
  }
}
