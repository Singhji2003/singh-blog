import mongoose from "mongoose";

const SuggestionSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    category: String,
    message: String,
  },
  {
    timestamp: true,
  },
);

const SuggestionModel = mongoose.model("suggestion", SuggestionSchema);
export default SuggestionModel;
