import BlogModel from "../models/blog.model.js";

export class BlogService {
  static async getSingleBlog(data) {
    const { link } = data;
    const blog = await BlogModel.findOne({ link });
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

  static async addBlog(data, img) {
    const newBlog = await BlogModel.create({
      title: data.title,
      description: data.description,
      metaTitle: data.title,
      metaDescription: data.description,
      link: data.link,
      category: data.category,
      htmlBody: data.htmlBody,
      image: img.url,
      keywords: data.keywords,
      faq: JSON.parse(data.faq),
    });

    await newBlog.save();

    return newBlog;
  }
}
