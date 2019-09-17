const { logInfo } = require("../utils/logger");
let io;
let clients = 0;

module.exports = {
  init: httpServer => {
    io = require("socket.io")(httpServer);
    io.on("connection", socket => {
      clients++;
      logInfo("Client connected", { clients });
      socket.on("disconnect", () => {
        clients--;
      });
    });
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socker.io not initialized!");
    }
    return io;
  }
};
