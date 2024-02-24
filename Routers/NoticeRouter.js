const express = require("express");
const router = express.Router();

class NoticeRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getNotices.bind(this.controller));
    return router;
  }
}

module.exports = NoticeRouter;
