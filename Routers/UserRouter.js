const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    return router;
  }
}

module.exports = UserRouter;
