const async = require('async')
const db = require('../models');
const { count, find } = require('../models/clothing.model');
const Clothing = db.clothing;
const { v4: uuidv4 } = require("uuid")

exports.addClothing = async (req, res) => {
  
  var count = await Clothing.count();
  const newID = uuidv4();
  
  const findID = async () => {
    var allIDS = await Clothing.find({}, 'id').exec();
    var tempID = '%' + req.body.id + '%' + (('000'+count).slice(-4));
    var tempCount = count
    while (allIDS.includes(tempID)) {
      tempCount++
    }
    return tempID;
  }

  findID().then((data) => (console.log(data)));
  
  // var allIDS = await Clothing.find({}, 'id').exec();
  // console.log(allIDS)

  const clothing = new Clothing({
    id: newID,
    type: '%'+req.body.id,
    name: req.body.name,
    mainColour: req.body.mainColour,
    subColours: req.body.subColours
  });

  clothing.save((err, clothing) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Clothing added successfully!" });
  })
}


const getClothing = async (req, res) => {
  const allClothing = await Clothing.find();
  res.send(allClothing);
}

module.exports.getClothing = getClothing;

const getClothingCount = async (req, res) => {
  const clothingCount = await Clothing.find().countDocuments({}, (err, count) => {
    return count
  })
  res.send(clothingCount)
}

module.exports.getClothingCount = getClothingCount;


const rmClothingItem = (req, res) => {
  Clothing.findOneAndDelete({id: req.body.itemID}, (err, item) => {
    if (err){
      console.log(err)
      // return err
    } else {
      console.log("Deleted item: "+item.id)
      // return 'Item deleted successfully'
    }
  })
  res.send({ message: 'Item deleted successfully'});
}

module.exports.rmClothingItem = rmClothingItem;