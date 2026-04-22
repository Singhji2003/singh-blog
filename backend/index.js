import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/conn.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
// Initialize app
const app = express();
dotenv.config();

// Mongoose connection
dbConnect();

// Middlewar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check
app.get("/health", (req, res) => {
  return res.status(200).json({ msg: "Server is Running!" });
});

app.use("/api/v1", userRoutes);

app.listen(5000, () => {
  console.log("Server is Running fine!");
});
