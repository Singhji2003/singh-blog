import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

const redisUrl = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";
const redisClient = createClient({
  url: redisUrl,
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis Connected Successfully ✅");
});

export default redisClient;
