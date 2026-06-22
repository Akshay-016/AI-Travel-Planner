const TravelPlan = require('../models/TravelPlan');

const getMyTrips = async (req, res) => {
  try {
    const trips = await TravelPlan.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(trips);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTrip = async (req, res) => {
  try {
    await TravelPlan.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: 'Trip deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMyTrips,
  deleteTrip,
};