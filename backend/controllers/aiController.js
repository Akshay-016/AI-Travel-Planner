const { GoogleGenerativeAI } = require('@google/generative-ai');
const TravelPlan = require('../models/TravelPlan');

const generateTravelPlan = async (req, res) => {
  try {
    const {
      destination,
      budget,
      days,
      interests
    } = req.body;

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash'
    });

    const prompt = `
Create a complete travel itinerary.

Destination: ${destination}
Budget: ${budget}
Days: ${days}
Interests: ${interests}

Provide:
1. Day-wise itinerary
2. Budget breakdown
3. Hotel recommendations
4. Food recommendations
5. Travel tips
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    await TravelPlan.create({
      userId: req.user.id,
      destination,
      budget,
      days,
      interests,
      plan: response
    });

    res.status(200).json({
      plan: response
    });

  } catch (error) {
    console.log('FULL ERROR:');
    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  generateTravelPlan
};