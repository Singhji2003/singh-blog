import { ContactService } from "../services/contact.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export class ContactController {
  static async saveMessage(req, res) {
    const respose = await ContactService.saveMessage(req.body);

    ApiResponse.success(res, respose, "Contact Saved Successfully!", 200);
  }
}
