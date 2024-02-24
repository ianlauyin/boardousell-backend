const express = require("express");
const router = express.Router();

class OrderRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/search`, this.controller.searchOrder.bind(this.controller));
    router.put(
      `/status`,
      this.controller.updateOrderStatus.bind(this.controller)
    );
    return router;
  }
}

module.exports = OrderRouter;
