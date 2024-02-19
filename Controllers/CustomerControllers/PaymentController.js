require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

class PaymentController {
  getPaymentIntent = async (req, res) => {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "hkd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  };
}

module.exports = PaymentController;
