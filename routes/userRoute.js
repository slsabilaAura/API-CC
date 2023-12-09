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

const {
  getCategories,
  getfoodIdCategory,
  createNutritionEntry,
  updateFoodName,
  getHistory} = require("../controller/gi_foodController");

router.get("/allUser", TokenCheck, getUsers);
router.post('/register', createUser);
router.post('/login', login);
router.get('/profile/:id', TokenCheck, getUserByUserId);
router.patch('/profile/updateusername/:id', TokenCheck, updateUsername);
router.post('/logout', TokenCheck, logout);


//get food 
router.get("/category",TokenCheck,getCategories);
router.get("/food/:id_category",TokenCheck,getfoodIdCategory);
router.post("/result",TokenCheck,createNutritionEntry);
router.patch('/result/updateFoodName/:id', TokenCheck,updateFoodName);
router.get("/history/:id_user",TokenCheck,getHistory)

// reuslt 



module.exports = router;
