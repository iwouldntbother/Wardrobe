const db = require('../models');
const Clothing = db.clothing;

exports.addClothing = (req, res) => {
  // console.log(req.body)

  const clothing = new Clothing({
    id: req.body.id,
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