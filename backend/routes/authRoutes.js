const express = require('express');
const router = express.Router();
const { loginUser, getUserProfile } = require('../controllers/authController');
const { protectRoute } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.get('/me', protectRoute, getUserProfile);

module.exports = router;
