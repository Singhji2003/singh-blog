import express from "express";
import { CategoryController } from "../Controller/category.controller.js";

const router = express();

router.get("/category", CategoryController.getCategory);
router.post("/each-category-data", CategoryController.getEachCategoryData);

export default router;
