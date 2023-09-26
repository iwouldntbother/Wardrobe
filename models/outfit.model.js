const mongoose = require('mongoose');

const Outfit = mongoose.model(
  'Outfit',
  new mongoose.Schema({
    id: String,
    // name: String,
    items: Array,
  })
);

module.exports = Outfit;
