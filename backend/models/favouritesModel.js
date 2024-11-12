const db = require('../../db/db.js');

const favouritesModel = {
  add: function add(userId, jobId) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO favorites (userId, jobId) VALUES (?, ?)',
        [userId, jobId],
        function(error) {
          if (error) {
            reject(error);
          }
          resolve(this.lastID);
        }
      );
    });
  },

  remove: function remove(userId, jobId) {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM favorites WHERE userId = ? AND jobId = ?',
        [userId, jobId],
        function(error) {
          if (error) {
            reject(error);
          }
          resolve(this.changes);
        }
      );
    });
  },

  getByUserId: function getByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT jobId FROM favorites WHERE userId = ?',
        [userId],
        (error, rows) => {
          if (error) {
            reject(error);
          }
          resolve(rows.map(row => row.jobId));
        }
      );
    });
  }
};

module.exports = favouritesModel;
