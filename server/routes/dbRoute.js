const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: "The database is currently available but not functioning." });
})

module.exports = router;