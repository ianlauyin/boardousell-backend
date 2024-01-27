const express = require("express");
const router = express.Router();

class CartRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/:userId", this.controller.getCart.bind(this.controller));
    return router;
  }
}

module.exports = CartRouter;
