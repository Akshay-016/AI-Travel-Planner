const mongoose = require('mongoose');

const travelPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    budget: {
      type: String,
      required: true,
    },

    days: {
      type: String,
      required: true,
    },

    interests: {
      type: String,
      required: true,
    },

    plan: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'TravelPlan',
  travelPlanSchema
);