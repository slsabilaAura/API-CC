
const {
  register,
  getUserByUserEmailOrUsername,
  getUserByUserId,
  getUsers,
  updateUser,
  addTokenToBlacklist,
} = require("../models/userModel");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const blacklistedTokens = new Set();

module.exports = {
  createUser: async (req, res) => {
    try {
      const { username, email, password, gender, repeatPassword } = req.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email) && password.trim().length < 7) {
        return res.status(422).json({
          success: 0,
          message: "Invalid email format and password must be at least 7 characters long",
        });
      }

      if (password.trim().length < 7) {
        return res.status(422).json({
          success: 0,
          message: "Password must be at least 7 characters long",
        });
      }

      if (password !== repeatPassword) {
        return res.status(400).json({
          success: 0,
          message: "Passwords do not match",
        });
      }

      if (!emailRegex.test(email)) {
        return res.status(422).json({
          success: 0,
          message: "Invalid email format",
        });
      }

      try {
        const result = await register({ username, email, password, gender });

        const sanitizedResult = {
          id: result.id,
        };
        return res.status(200).json({
          success: 1,
          message: "Registration successful",
          data: sanitizedResult,
        });
      } catch (error) {
        if (error.message.includes("Username is already taken")) {
          return res.status(409).json({
            success: 0,
            message: "This username is already in use",
          });
        } else if (error.message.includes("Email is already taken")) {
          return res.status(409).json({
            success: 0,
            message: "This email is already in use",
          });
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: 0,
        message: "Registration failed",
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
          data: "Internal Server Error",
        });
      }

      if (!user) {
        return res.status(401).json({
          success: 0,
          data: "Invalid email or username",
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
          token: token,
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

  // logout: (req, res) => {
  //   const token = req.get("authorization");

  //   if (token && !isTokenBlacklisted(token)) {
  //     logoutUserModel(token);
  //     res.json({
  //       success: 1,
  //       message: 'User logged out successfully',
  //     });
  //   } else {
  //     return res.status(401).json({
  //       success: 0,
  //       message: "Invalid or blacklisted token",
  //     });
  //   }
  // },

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

