
const mysql = require("../database/data");
const uuid = require('uuid');
const { hashSync, genSaltSync } = require("bcrypt");
let blacklistedTokens = [];

module.exports = {
  register: async (data) => {
    const { username, email, password, gender } = data;

    try {
      // Check if the username or email already exists
      const isUsernameTaken = await module.exports.isUsernameTaken(username);
      const isEmailTaken = await module.exports.isEmailTaken(email);

      if (isUsernameTaken) {
        throw new Error('Username is already taken');
      }

      if (isEmailTaken) {
        throw new Error('Email is already taken');
      }

      // Hash the password
      const salt = genSaltSync(10);
      const hashPassword = hashSync(data.password, salt);
      data.password = hashPassword;

      // Insert query
      const userId = uuid.v4();
      const query = `
        INSERT INTO users (id, username, gender, email, password) 
        VALUES (?, ?, ?, ?, ?)
      `;

      const results = await mysql.query(query, [userId, username, gender, email, data.password]);

      return results;
    } catch (error) {
      throw error; // Propagate the error to the caller
    }
  },

  isUsernameTaken: async (username) => {
    try {
      const query = 'SELECT COUNT(*) as count FROM users WHERE username = ?';
      const result = await mysql.query(query, [username]);

      if (result && result[0] && result[0].count !== undefined) {
        return result[0].count > 0;
      }
    } catch (error) {
      throw error;
    }
  },

  isEmailTaken: async (email) => {
    try {
      const query = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
      const result = await mysql.query(query, [email]);

      if (result && result[0] && result[0].count !== undefined) {
        return result[0].count > 0;
      }
    } catch (error) {
      throw error;
    }
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


