const router = require('express').Router();
const { TokenCheck } = require('../auth/tokenJWT');
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsername,
  logout,

} = require('../controller/userController');

const {

  getfoodIdCategory,
  postNutritionEntry,
  updateFoodName,
  getAllFood,
  getNutritionEntry,
  getHistory} = require("../controller/gi_foodController");

router.get("/allUser", TokenCheck, getUsers);

//user
router.post('/register', createUser); //register
router.post('/login', login); //login
router.get('/profile/:id', TokenCheck, getUserByUserId); //getuserbyID
router.patch('/profile/updateusername/:userId', TokenCheck, updateUsername);//updateUsername
router.post('/logout', TokenCheck, logout);//logout


//get food 
router.get("/allfood",TokenCheck,getAllFood)
router.get("/food/:id_category",TokenCheck,getfoodIdCategory);//Get Food by Category
router.post("/result/:id_users",TokenCheck,postNutritionEntry); //Entry hasil nutrition fact 
router.get("/result/:id",TokenCheck,getNutritionEntry); //get hasil nutrion fact by id result
router.patch('/result/updateFoodName/:idResult', TokenCheck,updateFoodName); //update nama foodnya
router.get("/history/:id_users",TokenCheck,getHistory) //history user


module.exports = router;
