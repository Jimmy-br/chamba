const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const sql = `
      INSERT INTO users 
      (uid_firebase, firstName, lastName, email, role, accountStatus, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?, ?, 'pending', NOW(), NOW())
    `;
    db.query(
      sql,
      [
        userData.uid_firebase,
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.role,
      ],
      callback
    );
  },

  findByUid: (uid, callback) => {
    const sql = 'SELECT * FROM users WHERE uid_firebase = ?';
    db.query(sql, [uid], callback);
  }
};

module.exports = User;
