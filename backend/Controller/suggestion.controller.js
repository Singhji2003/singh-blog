import { SuggestionService } from "../services/suggestion.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export class SuggestionController {
  static async saveSuggestion(req, res) {
    const response = await SuggestionService.saveSuggestion(req.body);

    if (response.error) {
      return ApiResponse.error(res, response.error, response.status);
    }
    return ApiResponse.success(res, response, "Saved Suggestion", 200);
  }
}
