const path = require('node:path'); 
const sqlite3 = require('sqlite3').verbose();

function createDBConnection() {
  const db = new sqlite3.Database(path.resolve(__dirname + '/starred.db'), (error) => {
    if (error) {
      return console.error(error.message)
    }
  })
  return db
}

module.exports = createDBConnection();