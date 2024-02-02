const express = require("express");
const router = express.Router();

class CategoryRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      `/suggest/:category`,
      this.controller.getSuggestProducts.bind(this.controller)
    );
    return router;
  }
}

module.exports = CategoryRouter;
