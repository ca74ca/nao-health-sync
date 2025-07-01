const { getDefaultConfig } = require("expo/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");

const config = getDefaultConfig(__dirname);

config.resolver.blacklistRE = exclusionList([
  /node_modules\/mongodb\/.*/,
  /backend\/.*/,
  /app\/api\/.*/,           // ✅ NEW: block server routes
  /lib\/mongo\.ts/,
]);

module.exports = config;
