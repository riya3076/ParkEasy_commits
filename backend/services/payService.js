const stripe = require('stripe')(process.env.SECRET_KEY);
const Payment = require('../models/payModel');

async function createPayment(price, address, userName, host) {
  try {
    // Your payment creation logic here
    // const host = req.get('origin');
    // Example: Create a payment record in the database
    const payment = new Payment({
      price,
      address,
      userName,
    });
    await payment.save();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "cad",
              product_data: {
                name: address,
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: host,
        cancel_url: `${host}/payment`,
      });

    // const notificationPayload = {
    //   userId,
    //   title: 'Payment Started',
    //   description: `Your payment for the ${packageName} package has been started successfully.`,
    //   payload: {
    //     type: 'payment',
    //     data: {
    //       amount,
    //       packageName,
    //     },
    //   },
    // };

    return { success: true, message: 'Operation successful', data: { link: session.url } };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Failed to create Stripe session' };
  }
}

module.exports = {
  createPayment,
};
