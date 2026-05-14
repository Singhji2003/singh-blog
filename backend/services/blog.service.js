import axios from "axios";
import BlogModel from "../models/blog.model.js";
import UserModel from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

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
  static async getAllBlog(data) {
    const {
      category,
      search,
      sortOrder = "latest",
      page = 1,
      limit = 5,
    } = data;

    // Build filter query
    const query = {};

    // Category filter (skip if "All")
    if (category && category !== "All") {
      query.category = category;
    }

    // Search filter (title or excerpt/content)
    if (search && search.trim() !== "") {
      query.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { excerpt: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // Sort: latest = newest first, oldest = oldest first
    const sort = { createdAt: sortOrder === "oldest" ? 1 : -1 };

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Run query + count in parallel
    const [blogs, total] = await Promise.all([
      BlogModel.find(query).sort(sort).skip(skip).limit(limitNum),
      BlogModel.countDocuments(query),
    ]);

    if (!blogs || blogs.length === 0) {
      return { error: "No blogs found", status: 404 };
    }

    return {
      blogs,
      total,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
    };
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

    const MAX_RETRIES = 3;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
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
        console.error(
          `Attempt ${attempt} failed:`,
          err.response?.data || err.message,
        );

        if (attempt === MAX_RETRIES) {
          return { error: "Failed to generate answer after 3 attempts" };
        }

        // Optional: small delay before retry (helps avoid rate limits)
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  // ✅ Generate Image (Hugging Face only)
  static async generateImage(prompt) {
    try {
      const response = await fetch(
        "https://router.huggingface.co/fal-ai/fal-ai/fast-sdxl",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `Create a high-quality ultra realistic blog featured image about ${prompt}`,
          }),
        },
      );

      const api = await response.json();

      console.log(api);

      return api;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // ✅ Slug generator
  static generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  // ✅ Generate Blog

  static async callAI(prompt) {
    const geminiModels = [
      "gemini-2.5-flash",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-flash-latest",
    ];

    let lastError;

    // 🔹 STEP 1: Try Gemini models
    for (const model of geminiModels) {
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          {
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-goog-api-key": process.env.GEMINI_API_KEY,
            },
            timeout: 20000,
          },
        );

        const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
          console.log(`✅ Gemini success: ${model}`);
          return text;
        }
      } catch (err) {
        console.warn(`⚠️ Gemini failed: ${model}`);
        lastError = err;
      }
    }

    // 🔹 STEP 2: Fallback to GROQ (LLaMA)
    try {
      console.log("🔁 Switching to Hugging face fallback...");

      const res = await axios.post(
        "https://router.huggingface.co/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          model: "Qwen/Qwen2.5-7B-Instruct:together",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );
      // Actual AI response text
      return res.data.choices[0].message.content;

      // if (text) {
      //   console.log("✅ GROQ fallback success");
      //   return text;
      // }
    } catch (err) {
      console.error("❌ Hugging face also failed");
      lastError = err;
    }

    // ❌ Final failure
    throw lastError;
  }

  static async generateBlog(data) {
    const { category } = data;
    try {
      const prompt = `
Generate a HIGH-QUALITY, SEO-optimized blog in JSON format.

INPUT:
- CATEGORY: "${category}"

TASK:
Based on the given category, automatically:
- Choose a TRENDING and HIGH-IMPACT topic
- Create a compelling SEO-friendly title
- Write a full blog that feels human, engaging, and storytelling-based
- Ensure content provides real value, insights, and practical advice

STRICT REQUIREMENTS:
- Blog must be more than 2000 words
- Content must NOT feel robotic or generic
- Must include storytelling, examples, and actionable insights
- Must be optimized for SEO and readability

CATEGORY RULE (VERY IMPORTANT):
- You MUST use the EXACT category provided in INPUT
- DO NOT modify, rephrase, translate, or format it
- Return it EXACTLY as: "${category}"
- Even a small change is NOT allowed

IMAGE RULE:
- Do NOT return any image prompt
- Leave "image" field empty string ""

RETURN FORMAT (STRICT JSON ONLY):
{
  "title": "",
  "description": "",
  "metaTitle": "",
  "metaDescription": "",
  "link": "slug generated from title (lowercase, words separated by dashes, no special characters)",
  "category": "${category}",
  "image": "",
  "keywords": "",
  "faq": [
    { "question": "", "answer": "" }
  ],
  "htmlBody": ""
}

RULES FOR LINK FIELD:
- Must be derived from title
- Must be lowercase
- Replace spaces with "-"
- Remove all special characters
- Example: "The Power of Discipline in Life" → "the-power-of-discipline-in-life"
`;
      const aiText = await this.callAI(prompt);

      // ✅ Clean response
      const cleaned = aiText.replace(/```json|```/g, "").trim();

      let blog;

      try {
        blog = JSON.parse(cleaned);
      } catch (e) {
        console.error("❌ JSON parse failed:", cleaned);
        throw new Error("Invalid JSON from AI");
      }

      // ✅ Reset image
      blog.image = "";
      // blog.category = category;

      // ✅ Generate image using HF
      // optional safety check

      const buffer = await this.generateImage(blog.title);

      if (!buffer || buffer.length < 1000) {
        console.log("Invalid image buffer");
        return;
      }

      const slug = this.generateSlug(blog.title);

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "Blogs",
            public_id: slug,
            overwrite: true,
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        stream.end(buffer); // ✅ correct binary upload
      });
      blog.image = uploadResult.url;
      blog.category = category;
      console.log(blog);
      const uplaodedBlog = await BlogModel.create(blog);
      return uplaodedBlog;
    } catch (error) {
      console.error(
        "Blog generation error:",
        error.response?.data || error.message,
      );
      throw new Error("Failed to generate blog");
    }
  }
}
