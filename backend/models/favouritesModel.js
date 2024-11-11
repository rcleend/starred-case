const db = require('../../db/db.js');

class FavouritesModel {
  static add(userId, jobId) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(
        'INSERT INTO favorites (userId, jobId) VALUES (?, ?)'
      );
      stmt.run([userId, jobId], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  }

  static remove(userId, jobId) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(
        'DELETE FROM favorites WHERE userId = ? AND jobId = ?'
      );
      stmt.run([userId, jobId], function(err) {
        if (err) reject(err);
        resolve(this.changes);
      });
    });
  }

  static getByUserId(userId) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(
        'SELECT jobId FROM favorites WHERE userId = ?'
      );
      stmt.all([userId], (err, rows) => {
        if (err) reject(err);
        resolve(rows.map(row => row.jobId));
      });
    });
  }
}

module.exports = FavouritesModel;
