import BlogModel from "../models/blog.model.js";
import CategoryModel from "../models/category.model.js";
import CacheService from "../services/cache.service.js";

export class CategoryService {
  static async getCategory(params) {
    const { hint } = params;
    const cacheKey = "all_categories_with_counts";

    const cachedData = await CacheService.get(cacheKey);

    if (cachedData) {
      let data = JSON.parse(cachedData);

      // 👇 handle double-string case
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      if (hint) {
        const lowerHint = hint.toLowerCase();
        data = data.filter((e) =>
          e?.title?.toLowerCase().startsWith(lowerHint),
        );
      }
      return data;
    }

    // Fetch from DB
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

    if (hint) {
      const lowerHint = hint.toLowerCase();
      return updatedCategories.filter((e) =>
        e?.title?.toLowerCase().startsWith(lowerHint),
      );
    }

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
