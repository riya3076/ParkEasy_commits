const feedbackService = require('../services/feedbackService');

const feedbackController = {
  createFeedback: async (req, res) => {
    try {
      const { name, comment, stars, postId } = req.body;
      // Validate request body if needed

      const newFeedback = await feedbackService.createFeedback({ name, comment, stars, postId });
      res.status(201).json(newFeedback);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // Add more controller methods as needed
};

module.exports = feedbackController;
