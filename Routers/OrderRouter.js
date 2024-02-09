const express = require("express");
const router = express.Router();

class OrderRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      `/all/:userId`,
      this.controller.getAllOrder.bind(this.controller)
    );
    router.get(
      `/info/:orderId`,
      this.controller.getOrder.bind(this.controller)
    );
    router.post(`/`, this.controller.postOrder.bind(this.controller));
    router.put(`/paid`, this.controller.paidOrder.bind(this.controller));

    return router;
  }
}

module.exports = OrderRouter;
