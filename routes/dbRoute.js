const controller = require('../controllers/clothingController')

module.exports = (app) => {
  // app.use((req, res, next) => {
  //   next();
  // })

  app.post('/api/addClothing', controller.addClothing)
  app.post('/api/rmClothingItem', controller.rmClothingItem)
  
  app.get('/api/getClothing', controller.getClothing)
  app.get('/api/getClothingCount', controller.getClothingCount)
}

// Start Local DB
// $ sudo mongod --dbpath /usr/local/var/mongodb/data/db/