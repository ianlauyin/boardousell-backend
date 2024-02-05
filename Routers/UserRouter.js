const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/login/:uuid`, this.controller.loginUser.bind(this.controller));
    router.put(`/:userId`, this.controller.updateUser.bind(this.controller));
    router.get(`/:userId`, this.controller.getUserInfo.bind(this.controller));
    return router;
  }
}

module.exports = UserRouter;
