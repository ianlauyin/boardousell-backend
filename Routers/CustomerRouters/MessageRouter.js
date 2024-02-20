const express = require("express");
const router = express.Router();

class MessageRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post(`/`, this.controller.postCustomerMessage.bind(this.controller));
    return router;
  }
}

module.exports = MessageRouter;
