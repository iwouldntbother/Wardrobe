module.exports = (app) => {

  app.get('/', express.static(path.join(__dirname, 'public')))
}

// Start Local DB
// $ sudo mongod --dbpath /usr/local/var/mongodb/data/db/