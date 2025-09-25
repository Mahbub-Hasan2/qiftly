// src/lib/redisClient.js
import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "";

let client;

if (REDIS_URL) {
  // Use a global to avoid multiple connections in dev (hot reload)
  if (!global.__redis) {
    global.__redis = new Redis(REDIS_URL);
    global.__redis.on("error", (err) => {
      console.error("[ioredis] error:", err);
    });
    global.__redis.on("connect", () => {
      console.log("[ioredis] connected");
    });
  }
  const r = global.__redis;
  client = {
    get: (k) => r.get(k),
    setEx: (k, v, ttl) => r.set(k, v, "EX", ttl),
    del: (k) => r.del(k),
  };
} else {
  // Fallback in-memory store for quick local dev WITHOUT redis installed
  const store = new Map();
  client = {
    get: async (k) => {
      const value = store.get(k);
      return value ?? null;
    },
    setEx: async (k, v, ttl) => {
      store.set(k, v);
      setTimeout(() => store.delete(k), ttl * 1000);
      return "OK";
    },
    del: async (k) => {
      store.delete(k);
      return 1;
    },
  };
  console.log("[redisClient] Using in-memory fallback (no REDIS_URL)");
}

export default client;
