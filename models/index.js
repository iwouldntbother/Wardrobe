const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.clothing = require('./clothing.model')

db.outfit = require('./outfit.model')

module.exports = db;