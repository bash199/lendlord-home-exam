const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", false);

mongoose?.connection?.on("connected", () => {
   log.info("Mongoose connected");
});

mongoose?.connection?.on("disconnected", () => {
   log.info("Mongoose disconnected");
});

mongoose?.connection?.on("error", (err) => {
   log.error("Mongoose error", err);
});

module.exports.init = async () => {
   const connString = process.env.MONGO_CONN_STRING ? process.env.MONGO_CONN_STRING : config.database;
   await mongoose.connect(connString);

   log.info("connected to database");
};
