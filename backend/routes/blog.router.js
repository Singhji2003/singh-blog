import express from "express";
import { BlogController } from "../Controller/blog.controller.js";
const router = express.Router();

router.get("/blog/:blog_id", BlogController.getSingleBlog);
router.get("/all-blog/:category", BlogController.getBlogCategoryWise);

export default router;
