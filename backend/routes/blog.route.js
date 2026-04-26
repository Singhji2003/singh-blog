import express from "express";
import { BlogController } from "../Controller/blog.controller.js";
const router = express.Router();
import upload from "../middleware/upload.js";
router.get("/blog/:link", BlogController.getSingleBlog);
router.get("/all-blog/:category", BlogController.getBlogCategoryWise);

router.post("/add-blog", upload.single("image"), BlogController.addBlog);

export default router;
