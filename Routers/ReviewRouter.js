const express = require("express");
const router = express.Router();

class ReviewRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    return router;
  }
}

module.exports = ReviewRouter;
