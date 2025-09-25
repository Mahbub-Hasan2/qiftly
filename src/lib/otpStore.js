// src/lib/otpStore.js
import redisClient from "./redisClient";

const PREFIX = "otp:";

export async function saveOtp(email, otp, ttl = 180) {
  const key = PREFIX + email;
  // set with expiry
  return redisClient.setEx(key, otp, ttl);
}

export async function getOtp(email) {
  const key = PREFIX + email;
  return redisClient.get(key);
}

export async function deleteOtp(email) {
  const key = PREFIX + email;
  return redisClient.del(key);
}
