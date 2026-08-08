const express = require('express');
const router = express.Router();

const { getDashboardStats, getRequirements } = require('../controllers/requirementController');
const { protectRoute } = require('../middleware/authMiddleware');

router.get('/dashboard-stats', protectRoute, getDashboardStats);
router.get('/', protectRoute, getRequirements);

module.exports = router;
