import mongoose from "mongoose";
export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected Successfully ✅");
    })
    .catch((err) => {
      console.error("MongoDB Connection Failed ❌", err);
    });
};
