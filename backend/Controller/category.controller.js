import { CategoryService } from "../services/category.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export class CategoryController {
  static getCategory = async (req, res) => {
    const response = await CategoryService.getCategory();

    return ApiResponse.success(res, response, "Category is Fetched", 200);
  };
  static getEachCategoryData = async (req, res) => {
    const response = await CategoryService.getEachCategoryData(req.body);

    return ApiResponse.success(res, response, "Category is Fetched", 200);
  };
}
