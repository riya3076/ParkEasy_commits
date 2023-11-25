const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Define feedback routes
router.post('/create', feedbackController.createFeedback);
// Add more routes as needed

module.exports = router;
