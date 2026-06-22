const express = require('express');
const router = express.Router();

const {
  getMyTrips,
  deleteTrip,
} = require('../controllers/travelPlanController');

const {
  protect,
} = require('../middleware/authMiddleware');

router.get('/my-trips', protect, getMyTrips);

router.delete(
  '/:id',
  protect,
  deleteTrip
);

module.exports = router;