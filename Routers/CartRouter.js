const express = require("express");
const router = express.Router();

class CartRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    return router;
  }
}

module.exports = CartRouter;
