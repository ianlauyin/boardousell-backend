const express = require("express");
const router = express.Router();

class CategoryRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/`, this.controller.getCategories.bind(this.controller));

    return router;
  }
}

module.exports = CategoryRouter;
