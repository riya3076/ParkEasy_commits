
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  // Define your payment schema here
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
