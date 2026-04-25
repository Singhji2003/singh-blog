import express from "express";
import { ContactController } from "../Controller/contact.controller.js";

const router = express.Router();

router.post("/contact", ContactController.saveMessage);

export default router;
