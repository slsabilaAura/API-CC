const {
  register,
  getUserByUserEmailOrUsername,
  getUserByUserId,
  getUsers,
  updateUser,
  addTokenToBlacklist,
 
} = require("../models/userModel");
const {  compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const blacklistedTokens = new Set();

module.exports = {
  createUser : async (req, res) => {
    try {
      const { username, email, password, gender, repeatPassword } = req.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(email) || password.trim().length < 7) {
        return res.status(422).json({
          success: 0,
          message: "Invalid email format or password must be at least 7 characters long",
        });
      }
  
      if (password !== repeatPassword) {
        return res.status(400).json({
          success: 0,
          message: "Passwords do not match",
        });
      }
  
      try {
        const userData = await register({ username, email, password, gender });
  
        return res.status(200).json({
          success: 1,
          message: "Registration successful",
          // data: userData, // Send the user data to the client
        });
      } catch (error) {
        if (error.message === 'Email is already registered.') {
          return res.status(400).json({
            success: 0,
            message: "Email is already registered",
          });
        }
  
        console.error(error);
        return res.status(500).json({
          success: 0,
          message: "Registration failed",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: 0,
        message: "Internal server error",
      });
    }
  },
  


  login: (req, res) => {
    const body = req.body;
    const identifier = body.email || body.username;

    getUserByUserEmailOrUsername(identifier, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Internal Server Error",
        });
      }

      if (!user) {
        return res.status(401).json({
          success: 0,
          message: "Invalid email or username",
        });
      }

      const isPasswordValid = compareSync(body.password, user.password);

      if (isPasswordValid) {
        // const token = sign({ userId: user.id, username: user.username }, "qwe1234", {
        //   expiresIn: "1h",
        // });

        const token = sign({ userId: user.id, username: user.username }, "qwe1234");

        return res.status(200).json({
          success: 1,
          message: "Login successful",
          loginResult: {
            userId: user.id, 
            username: user.username,
            token: token,
          }
        });
      } else {
        return res.status(401).json({
          success: 0,
          data: "Invalid password",
        });
      }
    });
  },

  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "User not Found",
        });
      }

      results.password = undefined;
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  updateUsername: (req, res) => {
    const userId = req.params.userId;
    const newUsername = req.body.newUsername;

    updateUser({ username: newUsername, id: userId  }, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error updating username",
        });
      }

      if (results.affectedRows > 0) {
        return res.status(200).json({
          success: 1,
          message: "Username has been updated successfully",
        });
      } else {
        return res.status(404).json({
          success: 0,
          message: " User not found or no changes made.",
        });
      }
    });
  },

  

  logout: (req, res) => {
    const token = req.get("authorization");

    if (token) {
      // Remove Bearer from string
      const cleanedToken = token.slice(7);

      // Add the token to the blacklist
      addTokenToBlacklist(cleanedToken);

      return res.status(200).json({
        success: 1,
        message: "Logout successful",
      });
    } else {
      return res.status(400).json({
        success: 0,
        message: "Token not provided",
      });
    }
  },

};

