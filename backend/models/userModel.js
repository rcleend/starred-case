const db = require('../../db/db.js');

const userModel = {
  getAll: function getAll() {
    return new Promise((resolve, reject) => {
    db.all("SELECT * FROM user", (error, rows) => {
      if (error) {
        reject(error);
      }
      resolve(rows);
    });
  });
  },

  getFirst: function getFirst() {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM user LIMIT 1", (error, row) => {
      if (error) {
        reject(error);
      }
      resolve(row);
    });
    });
  }
};


module.exports = userModel;
