import redisClient from "../config/redis.js";

class CacheService {
  static async get(key) {
    return await redisClient.get(key);
  }

  static async set(key, value, ttl = 3600) {
    await redisClient.set(key, JSON.stringify(value), { EX: ttl });
  }

  static async del(key) {
    await redisClient.del(key);
  }
}

export default CacheService;
