var mongoose = require("mongoose");

var isConnectedBefore = false;
var connect = () =>
  mongoose.connect(global.gConfig.mongo_url, {
    useNewUrlParser: true,
    useCreateIndex: true
  });

connect();

mongoose.connection.on("error", function() {
  console.log("Could not connect to MongoDB");
});

mongoose.connection.on("disconnected", function() {
  console.log("Lost MongoDB connection...");
  if (!isConnectedBefore) setTimeout(connect, 5000);
});
mongoose.connection.on("connected", function() {
  isConnectedBefore = true;
  console.log("Connection established to MongoDB");
});

mongoose.connection.on("reconnected", function() {
  console.log("Reconnected to MongoDB");
});

process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log("Force to close the MongoDB conection");
    process.exit(0);
  });
});
