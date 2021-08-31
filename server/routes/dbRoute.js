const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: "The database is currently available but not functioning." });
})

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/';

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  try {
    var dbo = db.db("wardrobeDB");
    dbo.createCollection("clothingTypeIDS", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  } catch (err) {
    console.log('Collection already exists: '+err)
  }
  // dbo.createCollection("clothingTypeIDS", function(err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  //   db.close();
  // });
});




module.exports = router;

// Start Local DB
// $ sudo mongod --dbpath /usr/local/var/mongodb/data/db/