const async = require('async')
const db = require('../models');
const { count, find } = require('../models/clothing.model');
const Clothing = db.clothing;

exports.addClothing = async (req, res) => {
  // console.log(req.body)

  // const checkID = await Clothing.find({id: newID})
  // while (checkID) {
    //   count++
    //   newID = '%' + req.body.id + '%' + (('000'+count).slice(-4));
    // }
    // const findNewID = () => {
      //   tempID = '%' + req.body.id + '%' + (('000'+count).slice(-4));
      //   console.log(tempID)
      //   Clothing.findOne({id: tempID}, (err, item) => {
        //     console.log(err, item)
        //     if (item) {
          //       return
          //     } else {
            //       count++
            //       findNewID();
            //     }
            //   })
            //   return tempID
            // }
            
            // var newID = findNewID();
            
            // async.whilst(
              //   () => { return Clothing.findOne({id: newID}) == false; },
              //   (next) => {
                //     count++
                //     newID = '%' + req.body.id + '%' + (('000'+count).slice(-4));
                //     next();
                //   },
                //   (err) => {
                  //     console.log(err, count)
                  //   }
                  // )
  
  
  var count = await Clothing.count();
  const newID = 'thisisntworkingyet'
  
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