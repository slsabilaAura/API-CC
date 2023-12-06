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

router.get("/allUser", TokenCheck, getUsers);
router.post('/register', createUser);
router.post('/login', login);
router.get('/profile/:id', TokenCheck, getUserByUserId);
router.patch('/profile/updateusername/:id', TokenCheck, updateUsername);
router.post('/logout', TokenCheck, logout);

module.exports = router;
