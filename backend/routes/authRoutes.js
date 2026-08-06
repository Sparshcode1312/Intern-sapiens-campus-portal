const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require('../controllers/authController');

const {
  protectRoute,
} = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protectRoute, getCurrentUser);

module.exports = router;
