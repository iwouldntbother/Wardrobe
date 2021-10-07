const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path')
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// process.env.MONGODB_URI = 'mongodb://localhost:27017/wardrobeDB'

const MONGO_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/wardrobeDB'


// const dbConfig = require("./config/db.config");
const db = require("./models");

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

db.mongoose
.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
  console.log(path.join(__dirname, 'public'));
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

require('./routes/dbRoute')(app);
// require('./routes/indexRoute')(app);


// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// app.use(express.static('public'));


// // app.use("/wardrobe", express.static('D:/home/site/wwwroot/public'));
// app.use('/wardrobe', express.static(path.join(__dirname, 'public')));

app.get('/test', (res, req) => {
  req.send('Hello');
})

// app.use("/", express.static(__dirname + '/home/site/wwwroot/public'));

// app.get('/', function(req, res) {
//   res.sendFile(path.join('/home/site/wwwroot/public', 'index.html'));
// });

app.use('/', express.static('/home/site/wwwroot/public'));

// console.log(path.join(__dirname, 'public'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
