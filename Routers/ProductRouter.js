const express = require("express");
const router = express.Router();

class ProductRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    return router;
  }
}

module.exports = ProductRouter;
