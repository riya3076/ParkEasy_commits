const Feedback = require('../models/Feedback');

const feedbackService = {
  createFeedback: async ({ name, comment, stars, postId }) => {
    try {
      // Validate data or perform other logic as needed
      const newFeedback = await Feedback.create({ name, comment, stars, postId });
      return newFeedback;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create feedback');
    }
  },
  // Add more service methods as needed
};

module.exports = feedbackService;
