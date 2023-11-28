const express = require('express');
const payController = require('../controllers/payController');

const router = express.Router();

router.post('/', payController.payment);


module.exports = router;
