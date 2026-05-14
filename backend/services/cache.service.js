import redisClient from "../config/redis.js";

class CacheService {
  static async get(key) {
    try {
      return await redisClient.get(key);
    } catch (err) {
      console.warn("Cache get failed:", err.message);
      return null;
    }
  }

  static async set(key, value, ttl = 3600) {
    try {
      await redisClient.set(key, JSON.stringify(value), { EX: ttl });
    } catch (err) {
      console.warn("Cache set failed:", err.message);
    }
  }

  static async del(key) {
    try {
      await redisClient.del(key);
    } catch (err) {
      console.warn("Cache delete failed:", err.message);
    }
  }
}

export default CacheService;
