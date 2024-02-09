const express = require("express");
const router = express.Router();

class InfomationRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/admin`, this.controller.adminGetAllInfo.bind(this.controller));
    router.get(`/`, this.controller.getAllInfo.bind(this.controller));
    router.delete(`/:infoId`, this.controller.deleteInfo.bind(this.controller));

    return router;
  }
}

module.exports = InfomationRouter;
