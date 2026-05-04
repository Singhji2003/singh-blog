import express from "express";
import { SuggestionController } from "../Controller/suggestion.controller.js";

const router = express.Router();

router.post("/suggestions", SuggestionController.saveSuggestion);

export default router;
