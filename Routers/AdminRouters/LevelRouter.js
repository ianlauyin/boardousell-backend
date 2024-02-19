const express = require("express");
const router = express.Router();

class LevelRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/`, this.controller.getAllLevel.bind(this.controller));
    router.post(`/`, this.controller.addNewLevel.bind(this.controller));
    router.put(`/`, this.controller.updateLevelInfo.bind(this.controller));
    router.delete(
      `/:levelId`,
      this.controller.deleteLevel.bind(this.controller)
    );
    return router;
  }
}

module.exports = LevelRouter;
