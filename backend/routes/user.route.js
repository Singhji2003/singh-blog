import express from "express";
import { UserController } from "../Controller/user.controller.js";
const router = express.Router();

router.post("/auth-register", UserController.createAccount);
router.post("/auth-login", UserController.login);

export default router;
