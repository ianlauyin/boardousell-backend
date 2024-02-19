const express = require("express");
const router = express.Router();

class PaymentRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post(`/`, this.controller.getPaymentIntent.bind(this.controller));
    return router;
  }
}

module.exports = PaymentRouter;
