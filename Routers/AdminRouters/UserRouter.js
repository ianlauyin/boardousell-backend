const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/search`, this.controller.searchUser.bind(this.controller));
    router.put(
      `/:userId`,
      this.controller.updateUserPoints.bind(this.controller)
    );
    return router;
  }
}

module.exports = UserRouter;
