const clothingController = require('../controllers/clothingController')
const outfitController = require('../controllers/outfitController')

module.exports = (app) => {

  app.post('/api/addClothing', clothingController.addClothing)
  app.post('/api/rmClothingItem', clothingController.rmClothingItem)
  
  app.get('/api/getClothing', clothingController.getClothing)
  app.get('/api/getClothingCount', clothingController.getClothingCount)

  app.post('/api/addOutfit', outfitController.addOutfit)
  app.post('/api/rmOutfitItem', outfitController.rmOutfitItem)

  app.get('/api/getOutfit', outfitController.getOutfit)
  app.get('/api/getOutfitCount', outfitController.getOutfitCount)
}

// Start Local DB
// $ sudo mongod --dbpath /usr/local/var/mongodb/data/db/