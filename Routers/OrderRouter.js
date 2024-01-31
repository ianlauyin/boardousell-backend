const express = require("express");
const router = express.Router();

class OrderRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/:orderId`, this.controller.getOrder.bind(this.controller));
    router.post(`/`, this.controller.postOrder.bind(this.controller));
    return router;
  }
}

module.exports = OrderRouter;
