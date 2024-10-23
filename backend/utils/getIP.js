const { networkInterfaces } = require("node:os");

function getIP() {
  const ip = networkInterfaces()["Wi-Fi"]?.find(
    (item) => item.family === "IPv4",
  );

  if (ip) {
    return ip.address;
  }
}

module.exports = getIP;
