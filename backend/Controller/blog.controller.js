import { BlogService } from "../services/blog.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export class BlogController {
  static getSingleBlog = async (req, res) => {
    const response = await BlogService.getSingleBlog(req.params);

    if (response.error) {
      return ApiResponse.error(res, response.error, response.status);
    }

    return ApiResponse.success(res, response, "Blog fetched!", 200);
  };

  static getBlogCategoryWise = async (req, res) => {
    const response = await BlogService.getBlogCategoryWise(req.params);

    if (response.error) {
      return ApiResponse.error(res, response.error, response.status);
    }

    return ApiResponse.success(res, response, "Blog fetched!", 200);
  };
}
