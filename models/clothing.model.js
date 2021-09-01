const mongoose = require("mongoose");

const Clothing = mongoose.model(
  "Clothing",
  new mongoose.Schema({
    id: String,
    iconPath: String,
    mainColour: String,
    subColours: Array
  })
);

module.exports = Clothing;