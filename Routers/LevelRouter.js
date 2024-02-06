const express = require("express");
const router = express.Router();

class LevelRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/`, this.controller.getAllLevel.bind(this.level));
    return router;
  }
}

module.exports = LevelRouter;
