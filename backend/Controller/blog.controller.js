import { BlogService } from "../services/blog.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cloudinary from "../config/cloudinary.js";
export class BlogController {
  static getSingleBlog = async (req, res) => {
    const response = await BlogService.getSingleBlog(req.params, req.query);

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
  static getAllBlog = async (req, res) => {
    const response = await BlogService.getAllBlog();

    if (response.error) {
      return ApiResponse.error(res, response.error, response.status);
    }

    return ApiResponse.success(res, response, "Blog fetched!", 200);
  };
  static generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };
  static addBlog = async (req, res) => {
    try {
      if (!req.file) {
        return ApiResponse.error(res, "Image not found", 400);
      }

      // 🔥 wrap upload_stream in promise
      const uploadToCloudinary = (buffer, slug) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "Blogs",
              public_id: slug, // 🔥 THIS sets file name
              overwrite: true, // optional (replace if exists)
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          stream.end(buffer);
        });
      };
      // 🔥 generate slug
      const slug = this.generateSlug(req.body.title);
      // ✅ upload image
      const result = await uploadToCloudinary(req.file.buffer, slug);

      // ✅ get image data
      const img = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      // 👉 your blog data (adjust as per your req.body)
      const data = req.body;
      // ✅ save blog (uncomment when ready)
      const response = await BlogService.addBlog(data, img);

      // ✅ ONLY ONE RESPONSE
      return ApiResponse.success(res, response, "Blog Added", 200);
    } catch (error) {
      console.error(error);
      return ApiResponse.error(
        res,
        error.message || "Something went wrong",
        500,
      );
    }
  };

  static likeBlog = async (req, res) => {
    const response = await BlogService.likeBlog(req.body);

    if (response.error) {
      return ApiResponse.error(res, response.error, response.status);
    }
    return ApiResponse.success(
      res,
      response,
      "Blog Likes/Disliked Successfully",
      200,
    );
  };
  static saveBlog = async (req, res) => {
    const response = await BlogService.saveBlog(req.body);

    if (response.error) {
      return ApiResponse.error(res, response.error, response.status);
    }
    return ApiResponse.success(res, response, "Blog Saved", 200);
  };

  static postComment = async (req, res) => {
    const response = await BlogService.postComment(req.body);
    if (response.error) {
      return ApiResponse.error(res, response.error, response.status);
    }
    return ApiResponse.success(res, response, "Comment Posted!", 200);
  };

  static generateBlog = async (req, res) => {
    const response = await BlogService.generateBlogAnswer(req.body);
    return ApiResponse.success(res, response, "Blog Generated!", 200);
  };
}
