// config.js
const { readFileSync } = require('fs');

module.exports = {
  token: process.env.token || readFileSync('src/token.txt', 'utf-8'),
  topggAPI: process.env.topggAPI || readFileSync('src/topggAPI.txt', 'utf-8'),
  clientId: process.env.clientId || "",
  ownerIds: ["", ""], // Array of owner IDs
  mainOwnerId: "",
  mongoURL: process.env.mongoURL || readFileSync('src/mongoURL.txt', 'utf-8'),
  prefix: "!",
  color: {
    default: "#ffffff",
    red: "#ff0000",
    green: "#008000"
  },
  lavalink_url: process.env.lavalink_url || readFileSync('src/lavalink-url.txt', 'utf-8'),
  lavalink_auth: process.env.lavalink_auth || readFileSync('src/lavalink-auth.txt', 'utf-8'),
};