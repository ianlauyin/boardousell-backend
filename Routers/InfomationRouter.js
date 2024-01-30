const express = require("express");
const router = express.Router();

class InfomationRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    return router;
  }
}

module.exports = InfomationRouter;
