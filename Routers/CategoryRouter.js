const express = require("express");
const router = express.Router();

class CategoryRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    return router;
  }
}

module.exports = CategoryRouter;
