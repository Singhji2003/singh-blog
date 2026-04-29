import express from "express";
import { BlogController } from "../Controller/blog.controller.js";
const router = express.Router();
import upload from "../middleware/upload.js";
router.get("/blog/:link", BlogController.getSingleBlog);
router.get("/all-blog/:category", BlogController.getBlogCategoryWise);
router.get("/get-blog", BlogController.getAllBlog);

router.post("/add-blog", upload.single("image"), BlogController.addBlog);
router.post("/like-blog", BlogController.likeBlog);
router.post("/save-blog", BlogController.saveBlog);
router.post("/post-comment", BlogController.postComment);

router.post("/know-about-blog", BlogController.generateBlog);

export default router;
