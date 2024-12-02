const redis = require("redis");

// Use the correct Redis URL for the Docker network
const redisUrl = process.env.REDIS_URL || 'redis://redis:6379';

// Create the Redis client
const client = redis.createClient({
  url: redisUrl
});

client.on("error", (err) => console.error("Redis Error:", err));

client.connect();

module.exports = client;
