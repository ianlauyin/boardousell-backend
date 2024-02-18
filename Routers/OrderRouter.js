const express = require("express");
const router = express.Router();

class OrderRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      `/product`,
      this.controller.adminSearchProduct.bind(this.controller)
    );
    router.get(
      `/email`,
      this.controller.adminSearchEmail.bind(this.controller)
    );
    router.get(
      `/message`,
      this.controller.adminSortMessage.bind(this.controller)
    );
    router.get(
      `/status`,
      this.controller.adminSearchStatus.bind(this.controller)
    );
    router.get(
      `/admin/:orderId`,
      this.controller.adminGetOrder.bind(this.controller)
    );
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
