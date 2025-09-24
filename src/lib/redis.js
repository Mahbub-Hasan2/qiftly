import Redis from "ioredis";

let redis;
if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL);
} else {
  console.log("Redis not configured. Skipping Redis connection.");
}
export default redis;
