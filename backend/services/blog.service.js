import BlogModel from "../models/blog.model.js";
import UserModel from "../models/user.model.js";

export class BlogService {
  static async getSingleBlog(data, query) {
    try {
      const { link } = data;
      const { id } = query;

      let user = null;

      if (id) {
        user = await UserModel.findById(id);
      }

      let blog = await BlogModel.findOne({ link }).lean(); // convert to plain object

      if (!blog) {
        return { error: "Blog not found", status: 404 };
      }

      return {
        ...blog,
        saved: user?.savedBlogs?.includes(String(blog._id)) || false,
      };
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong", status: 500 };
    }
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

  static async likeBlog(data) {
    const { id, blogId } = data;

    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return { error: "Blog not found", status: 404 };
    }

    let updatedBlog;

    if (blog.likes.includes(id)) {
      // Unlike
      updatedBlog = await BlogModel.findByIdAndUpdate(
        blogId,
        { $pull: { likes: id } },
        { new: true },
      );
    } else {
      // Like
      updatedBlog = await BlogModel.findByIdAndUpdate(
        blogId,
        { $addToSet: { likes: id } },
        { new: true },
      );
    }

    return updatedBlog;
  }

  static async saveBlog(data) {
    const { id, blogId } = data;

    const user = await UserModel.findById(id);

    if (!user) {
      return { error: "User not found", status: 404 };
    }

    let updatedBlog;

    if (user?.savedBlogs.includes(blogId)) {
      updatedBlog = await UserModel.findByIdAndUpdate(
        id,
        { $pull: { savedBlogs: blogId } },
        { new: true },
      );
    } else {
      updatedBlog = await UserModel.findByIdAndUpdate(
        id,
        { $addToSet: { savedBlogs: blogId } },
        { new: true },
      );
    }

    return updatedBlog;
  }

  static async postComment(data) {
    try {
      const { id, blogId, comment, name } = data;

      const updatedBlog = await BlogModel.findByIdAndUpdate(
        blogId,
        {
          $push: {
            comments: {
              name,
              comment,
              userId: id,
              createdAt: new Date(),
            },
          },
        },
        { new: true },
      );

      if (!updatedBlog) {
        return { error: "Blog not found", status: 404 };
      }

      return updatedBlog;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong", status: 500 };
    }
  }
}
