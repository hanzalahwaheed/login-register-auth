import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // maximum number of requests allowed in the windowMs
  message: "Too many requests, please try again later.",
});
