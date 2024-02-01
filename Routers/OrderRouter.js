const express = require("express");
const router = express.Router();

class OrderRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.put(`/paid`, this.controller.paidOrder.bind(this.controller));
    router.get(`/:orderId`, this.controller.getOrder.bind(this.controller));
    router.post(`/`, this.controller.postOrder.bind(this.controller));
    return router;
  }
}

module.exports = OrderRouter;
