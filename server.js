const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// process.env.MONGODB_URI = 'mongodb://localhost:27017/wardrobeDB'

const MONGO_URL = process.env.MONGOD_URL || 'mongodb://localhost:27017/wardrobeDB'


const dbConfig = require("./config/db.config");
const db = require("./models");

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

db.mongoose
.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

require('./routes/dbRoute')(app);

app.use("/", express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
