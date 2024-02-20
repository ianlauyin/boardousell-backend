const express = require("express");
const router = express.Router();

class OrderRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/product`, this.controller.searchProduct.bind(this.controller));
    router.get(`/email`, this.controller.searchEmail.bind(this.controller));
    router.get(`/message`, this.controller.sortMessage.bind(this.controller));
    router.get(`/status`, this.controller.searchStatus.bind(this.controller));
    router.get(`/:orderId`, this.controller.getOrder.bind(this.controller));
    router.put(
      `/status`,
      this.controller.updateOrderStatus.bind(this.controller)
    );
    return router;
  }
}

module.exports = OrderRouter;
