const express = require("express");
const router = express.Router();

class LevelRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    return router;
  }
}

module.exports = LevelRouter;
