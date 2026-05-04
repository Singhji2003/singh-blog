import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/conn.js";
import userRoutes from "./routes/user.route.js";
import categoryRoutes from "./routes/category.route.js";
import blogRoutes from "./routes/blog.route.js";
import contactRoutes from "./routes/contact.route.js";
import cors from "cors";
import redisClient from "./config/redis.js";
await redisClient.connect();
import cron from "node-cron";
import { BlogService } from "./services/blog.service.js";
import CacheService from "./services/cache.service.js";

// Initialize app
const app = express();
dotenv.config();

// Mongoose connection
dbConnect();

// Middlewar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check
app.get("/health", (req, res) => {
  return res.status(200).json({ msg: "Server is Running!! 🎉 " });
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", blogRoutes);
app.use("/api/v1", contactRoutes);

// Categories pool
const categories = [
  "AI & Future",
  "Motivation",
  "Business",
  "Education",
  "Entertainment",
  "Food",
  "Technology",
  "Finance",
  "Health",
  "Sports",
  "Lifestyle",
  "Travel",
];

// 🔥 Runs daily at 8:00 AM IST
cron.schedule(
  "0 */2 * * *",
  async () => {
    console.log("🌅 Cron started: Generating 3 blogs...");

    try {
      for (let i = 0; i < 3; i++) {
        // 🎯 Pick random category
        const randomCategory =
          categories[Math.floor(Math.random() * categories.length)];

        console.log(`🚀 Generating blog ${i + 1} → ${randomCategory}`);

        const blog = await BlogService.generateBlog(randomCategory);

        console.log(`✅ Blog ${i + 1} created: ${blog.title}`);
      }

      console.log("🎉 All 3 blogs generated successfully");
      const cacheKey = "all_categories_with_counts";
      const cachedData = await CacheService.get(cacheKey);
      if (cachedData) {
        await CacheService.del(cacheKey);
      }
    } catch (err) {
      console.error("❌ Cron Error:", err.message);
    }
  },
  {
    timezone: "Asia/Kolkata",
  },
);

app.listen(5000, () => {
  console.log("Server is Running !");
});
