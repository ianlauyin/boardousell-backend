const express = require("express");
const router = express.Router();

class CategoryRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/all`, this.controller.getAllCategory.bind(this.controller));
    router.post(
      `/product`,
      this.controller.addProductToCategory.bind(this.controller)
    );
    router.get(
      `/suggest/:category`,
      this.controller.getSuggestProducts.bind(this.controller)
    );
    return router;
  }
}

module.exports = CategoryRouter;
