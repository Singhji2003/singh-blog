import BlogModel from "../models/blog.model.js";
import CategoryModel from "../models/category.model.js";
import CacheService from "../services/cache.service.js";

export class CategoryService {
  static async getCategory() {
    const cacheKey = "all_categories_with_counts";

    const cachedData = await CacheService.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const categories = await CategoryModel.find();

    const updatedCategories = await Promise.all(
      categories.map(async (category) => {
        const articleCount = await BlogModel.countDocuments({
          category: category.title,
        });

        return {
          ...category.toObject(),
          articleCount,
        };
      }),
    );

    await CacheService.set(cacheKey, updatedCategories);

    return updatedCategories;
  }

  static async getEachCategoryData(data) {
    const { category } = data;

    const categoryData = await CategoryModel.findOne({ id: category });

    const articleCount = await BlogModel.countDocuments({
      category: categoryData.title,
    });
    return {
      ...categoryData.toObject(),
      articleCount,
    };

    return categoryData;
  }
}
