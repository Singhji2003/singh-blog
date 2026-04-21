import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { UserService } from "../services/user.service.js";

export class UserController {
  static createAccount = asyncHandler(async (req, res) => {
    const response = await UserService.createAccount(req.body);

    if (response.error) {
      return ApiResponse.error(res, response.error, response.status);
    }
    return ApiResponse.success(
      res,
      response,
      "User Registered Successfully",
      200,
    );
  });
  static login = asyncHandler(async (req, res) => {
    const response = await UserService.login(req.body);

    if (response.error) {
      return ApiResponse.error(res, response.error, response.status);
    }
    return ApiResponse.success(
      res,
      response,
      "User Logged In Successfully",
      200,
    );
  });
}
