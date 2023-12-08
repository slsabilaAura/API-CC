const router = require('express').Router();
const { TokenCheck } = require('../auth/tokenJWT');
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsername,
  logout
} = require('../controller/userController');

const {getCategories,getfoodIdCategory} = require("../controller/gi_foodController");

router.get("/allUser", TokenCheck, getUsers);
router.post('/register', createUser);
router.post('/login', login);
router.get('/profile/:id', TokenCheck, getUserByUserId);
router.patch('/profile/updateusername/:id', TokenCheck, updateUsername);
router.post('/logout', TokenCheck, logout);


//get food 
router.get("/category",getCategories);
router.get("/food/:id_category",getfoodIdCategory);


module.exports = router;
