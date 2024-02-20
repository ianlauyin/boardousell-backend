const express = require("express");
const router = express.Router();

class NoticeRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/newest",
      this.controller.getNewestNotices.bind(this.controller)
    );
    router.get("/", this.controller.getAllNotices.bind(this.controller));
    return router;
  }
}

module.exports = NoticeRouter;
