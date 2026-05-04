import CategoryModel from "../models/category.model.js";
import SuggestionModel from "../models/suggestion.model.js";

export class SuggestionService {
  static async saveSuggestion(data) {
    const { category } = data;

    const existetCategory = await CategoryModel.findOne({
      title: {
        $regex: new RegExp(`^${category}$`, "i"),
      },
    });

    if (existetCategory) {
      return {
        error: "Category alraedy Exists please Explore the Domains!",
        status: 400,
      };
    }

    const suggestionExists = await SuggestionModel.findOne({ category });

    if (suggestionExists) {
      return {
        error: "Suggestion alraedy Exists!",
        status: 400,
      };
    }
    const suggestion = await SuggestionModel.create(data);

    return suggestion;
  }
}
