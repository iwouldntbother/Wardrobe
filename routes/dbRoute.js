const controller = require('../controllers/clothingController')

module.exports = (app) => {
  // app.use((req, res, next) => {
  //   next();
  // })

  app.post('/api/addClothing', controller.addClothing)

  app.get('/api/getClothing', controller.getClothing)
}

// Start Local DB
// $ sudo mongod --dbpath /usr/local/var/mongodb/data/db/