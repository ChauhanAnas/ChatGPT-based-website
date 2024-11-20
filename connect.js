const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/sell")
  .then(() => console.log("Connection successful"))
  .catch((error) => console.log(error));

module.exports = mongoose