const express = require('express');

const router = express.Router();

const {
  generateTravelPlan
} = require('../controllers/aiController');

const {
  protect
} = require('../middleware/authMiddleware');

router.post(
  '/generate',
  protect,
  generateTravelPlan
);

module.exports = router;