const mongoose = require("mongoose");

const Clothing = mongoose.model(
  "Clothing",
  new mongoose.Schema({
    id: String,
    type: String,
    name: String,
    brand: String,
    size: String,
    source: String,
    colour: String,
  })
);

module.exports = Clothing;