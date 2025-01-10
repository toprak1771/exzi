const Redis = require("ioredis");

const redis = new Redis();

redis.on("connect", () => {
  console.log("Redis bağlantısı başarılı!");
});

redis.on("error", (err) => {
  console.error("Redis bağlantı hatası:", err);
});

module.exports = redis;
