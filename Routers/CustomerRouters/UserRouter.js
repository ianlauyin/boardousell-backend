const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/:uuid`, this.controller.getUserInfo.bind(this.controller));
    router.put(
      `/:userId`,
      this.controller.updateUserInfo.bind(this.controller)
    );
    return router;
  }
}

module.exports = UserRouter;
