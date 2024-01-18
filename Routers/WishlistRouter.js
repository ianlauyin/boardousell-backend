const express = require("express");
const router = express.Router();

class WishlistRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    return router;
  }
}

module.exports = WishlistRouter;
