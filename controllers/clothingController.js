const db = require('../models');
const { count } = require('../models/clothing.model');
const Clothing = db.clothing;

exports.addClothing = async (req, res) => {
  // console.log(req.body)

  const count = await Clothing.count();
  var newID = '%' + req.body.id + '%' + (('000'+count).slice(-4));
  

  const clothing = new Clothing({
    id: newID,
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