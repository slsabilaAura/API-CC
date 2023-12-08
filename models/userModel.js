const mysql = require("../database/data");
const uuid = require('uuid');
const { hashSync, genSaltSync} = require("bcrypt");
const blacklistedTokens = new Set();


module.exports = {

  //create account
  register: async (data) => {
    const { username, email, password, gender} = data;

    try{
    // Check if the username or email already exists
      const isUsernameTaken = await module.exports.isUsernameTaken(username);
      const isEmailTaken = await module.exports.isEmailTaken(email);


      if (isUsernameTaken) {
        throw new Error('Username is already taken');
      }

      if (isEmailTaken) {
        throw new Error('Email is already taken');
      }

      //hash the password
      const salt = genSaltSync(10);
      const hashPassword = hashSync(data.password,salt);
      data.password = hashPassword;

      //insert query
      const userId = uuid.v4();
      const query = `
      INSERT INTO users ( id, username, gender, email, password) 
      VALUES ( ?,?, ?, ?, ?)`;

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
        // else {
        //   throw new Error('Username has already use');
        // }
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
        // else {
        //   throw new Error('Email has already use');
        // }
      } catch (error) {
        throw error;
      }
    },

  //    

  //login using username or email
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

  //get profile by id 
  getUserByUserId: (id, callBack) => {
    const query = `
      SELECT id, username, gender, email FROM users WHERE id = ?
    `;

    mysql.query(query, [id], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results[0]);
      }
    });
  },

  //get all users 
  getUsers: (callBack) => {
    const query = `
      SELECT id, username,  gender, email FROM users
    `;

    mysql.query(query, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },

  //update username on profile 
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


logoutUserModel : (token) => {
  // Instead of userId, we use the token itself to identify the token to be invalidated
  blacklistedTokens.add(token);

  // Return a Promise if needed
  return Promise.resolve();
},

isTokenBlacklisted :(token) => {
  return blacklistedTokens.has(token);
}

};

