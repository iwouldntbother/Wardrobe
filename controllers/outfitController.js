const db = require('../models');
const Outfit = db.outfit;
const { v4: uuidv4 } = require("uuid");

const addOutfit = async (req, res) => {
  
  const newID = uuidv4();

  const outfit = new Outfit({
    id: newID,
    name: req.body.name,
    items: req.body.items
  });

  outfit.save((err, outfit) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Outfit added successfully!" });
  })
}

module.exports.addOutfit = addOutfit;

const getOutfit = async (req, res) => {
  const allOutfit = await Outfit.find();
  res.send(allOutfit);
}

module.exports.getOutfit = getOutfit;

const getOutfitCount = async (req, res) => {
  const outfitCount = await Outfit.find().countDocuments({}, (err, count) => {
    return count
  })
  res.send(outfitCount)
}

module.exports.getOutfitCount = getOutfitCount;


const rmOutfitItem = (req, res) => {
  Outfit.findOneAndDelete({id: req.body.itemID}, (err, item) => {
    if (err){
      console.log(err)
      // return err
    } else {
      console.log("Deleted item: "+item.id)
      // return 'Item deleted successfully'
    }
  })
  res.send({ message: 'Outfit deleted successfully'});
}

module.exports.rmOutfitItem = rmOutfitItem;