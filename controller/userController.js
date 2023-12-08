const { register, getUserByUserEmailOrUsername, getUserByUserId, getUsers, updateUser, logoutUserModel, isTokenBlacklisted, checkUser } = require("../models/userModel");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const blacklistedTokens = new Set();

module.exports = {

  createUser: async(req,res)=>{
    try{
      const { username, email, password, gender, repeatPassword} = req.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!emailRegex.test(email) && password.trim().length < 7 ){
        return res.status(422).json({
          success: 0,
          message: "Invalid email format and password must be at least 7 characters long",
        });
      }

      if(password.trim().length < 7) {
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

      // next();
        // const result = await register({ username, email, password, gender });
        // return res.status(200).json({
        //   success: 1,
        //   message: "Registration successful",
        //   data : result
        // });
      
        // } catch (error) {
        //   console.error(error);
        //   return res.status(500).json({
        //     success: 0,
        //     message: "Registration failed",
        //   });
        // }

        try {
          const result = await register({ username, email, password, gender });

          const sanitizedResult = {
            // Include any specific properties you want to send in the response
            // For example, assuming result contains an 'id' property:
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
            throw error; // Re-throw other errors
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
          // Password is valid, create and send a JWT token
          const token = sign({ userId: user.id, username: user.username }, "qwe1234", {
            expiresIn: "1h",
          });
  
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
        return res.json({
          success: 0,
          message: "User not Found"
        });
      }

      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.json({
        success: 1,
        data: results
      });
    });
  },

updateUsername: (req, res) => {
  const { userId, newUsername } = req.body;

  updateUser({ username: newUsername, id: userId }, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Error updating username"
      });
    }

    // Check if any rows were affected
    if (results.affectedRows > 0) {
      return res.json({
        success: 1,
        message: "Username has been updated successfully"
      });
    } else {
      return res.json({
        success: 0,
        message: "No rows were updated. User not found or no changes made."
      });
    }
  });
},

logout: (req, res) => {
  const token = req.get("authorization");

  if (token && !isTokenBlacklisted(token)) {
    // Instead of destroying sessions, you invalidate the token
    // Assuming userModel is correctly required somewhere in your code
    // blacklistedTokens.add(token);
    logoutUserModel(token);
    res.json({
      success: 1,
      message: 'User logged out successfully'
    });
  } else {
    return res.status(401).json({
      success: 0,
      message: "Invalid or blacklisted token"
    });
  }
},


// Logout function for session-based authentication
logoutSession: (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({
        success: 0,
        message: 'Internal Server Error'
      });
    }
    res.clearCookie('sessionID'); // Optional: Clear the session cookie if you have one
    res.json({
      success: 1,
      message: 'User logged out successfully'
    });
  });
}



}

