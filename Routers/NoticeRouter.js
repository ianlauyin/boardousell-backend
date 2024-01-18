const express = require("express");
const router = express.Router();

class NoticeRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    return router;
  }
}

module.exports = NoticeRouter;
