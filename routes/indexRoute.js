

module.exports = (app) => {
  // app.use((req, res, next) => {
  //   next();
  // })

  app.get('/', express.static(path.join(__dirname, 'public')))
}

// Start Local DB
// $ sudo mongod --dbpath /usr/local/var/mongodb/data/db/