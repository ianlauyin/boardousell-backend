const express = require("express");
const router = express.Router();

class InfomationRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/`, this.controller.getAllInfo.bind(this.controller));
    return router;
  }
}

module.exports = InfomationRouter;
