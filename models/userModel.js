
const mysql = require("../database/data");
const uuid = require('uuid');
const { hashSync, genSaltSync } = require("bcrypt");
let blacklistedTokens = [];

module.exports = {

  //create account
  register :async ({ username, email, password, gender }) => {

    // Hash the password
    const salt = genSaltSync(10);
    const hashPassword = hashSync(password, salt);

    // Check if email already exists
    const emailExists = await module.exports.checkIfEmailExists(email);
  if (emailExists) {
    throw new Error('Email is already registered.');
  }

    // Insert query
    const userId = uuid.v4();
    const insertQuery = `
      INSERT INTO users (id, username, gender, email, password) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const registrationResults = await mysql.query(insertQuery, [userId, username, gender, email, hashPassword]);

    const userData = {
      id: userId,
      username: username,
      gender: gender,
      email: email,
    };

    return userData;
  },

  checkIfEmailExists : async (email) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      mysql.query(query, [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.length > 0);
        }
      });
    });
  },

  getUserByUserEmailOrUsername: (identifier, callBack) => {
    const query = `
      SELECT * FROM users WHERE email = ? OR username = ?
    `;

    mysql.query(query, [identifier, identifier], (error, results) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results[0]);
      }
    });
  },

  getUserByUserId: (id, callBack) => {
    const query = `
      SELECT id, email, username, gender FROM users WHERE id = ?
    `;

    mysql.query(query, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results[0]);
      }
    });
  },

  getUsers: (callBack) => {
    const query = `
      SELECT id, username, gender, email FROM users
    `;

    mysql.query(query, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },

  updateUser: (data, callBack) => {
    const query = `
      UPDATE users SET username=? WHERE id = ?
    `;

    mysql.query(query, [
      data.username,
      data.id
    ], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },


  addTokenToBlacklist: (token) => {
    blacklistedTokens.push(token);
  },

  isTokenBlacklisted: (token) => {
    return blacklistedTokens.includes(token);
  },
};


