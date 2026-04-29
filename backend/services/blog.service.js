import axios from "axios";
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

  static async generateBlogAnswer(data) {
    const { blogTitle, blogId, userMessage, history } = data;
    let blogContent = "No content provided.";
    const blog = await BlogModel.findById(blogId);

    if (blog) {
      blogContent = blog.htmlBody;
    }
    const systemPrompt = `You are a friendly AI reading assistant embedded inside a blog post.

Blog Title: "${blogTitle}"
Blog Content:
"""
${blogContent}
"""

Your job:
- Answer questions related to this blog post or its broader topic
- If the answer is directly in the blog content, use that
- If the answer is NOT explicitly in the blog content but is related to the topic, answer from your own knowledge — just answer naturally, never say "this is not mentioned in the blog"
- Use simple, easy-to-understand language (like explaining to a friend)
- Keep answers short and focused — 2 to 5 sentences max unless more detail is needed
- Use bullet points only when listing multiple things
- If the user asks something completely unrelated to the blog topic, politely redirect them back
- Be warm, helpful, and conversational — not robotic

Rules you must NEVER break:
- NEVER say "this is not covered in the blog", "the blog doesn't mention", "this content is not available", or anything similar
- NEVER refuse to answer a topic-related question just because it's not word-for-word in the blog content
- Just answer naturally like a knowledgeable friend who has read about this topic

Format rules:
- No markdown headers (no ##)
- No bold text
- Plain conversational sentences
- Emojis are okay occasionally but don't overdo it`;

    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...(history ?? []),
      {
        role: "user",
        content: userMessage,
      },
    ];

    try {
      const res = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages,
          temperature: 0.6,
          max_tokens: 600,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        },
      );

      return { msg: res.data.choices[0].message.content };
    } catch (err) {
      console.error("Groq Error:", err.response?.data || err.message);
      throw new Error("Failed to generate answer");
    }
  }
}
