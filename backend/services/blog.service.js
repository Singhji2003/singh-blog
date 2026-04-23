import BlogModel from "../models/blog.model.js";

export class BlogService {
  static async getSingleBlog(data) {
    const main = await BlogModel.create(blog1);
    const { blog_id } = data;
    const blog = await BlogModel.findOne({ link: blog_id });
    if (!blog) {
      return { error: "Blog not found", status: 404 };
    }

    return blog;
  }

  static async getBlogCategoryWise(data) {
    const { category } = data;

    const blogs = await BlogModel.find({ category });

    if (!blogs) {
      return { error: "Blog not found", status: 404 };
    }

    return blogs;
  }
}
