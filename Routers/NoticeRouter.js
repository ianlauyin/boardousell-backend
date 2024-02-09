const express = require("express");
const router = express.Router();

class NoticeRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getAllNotices.bind(this.controller));
    router.get(
      "/newest",
      this.controller.getNewestNotices.bind(this.controller)
    );
    router.post(`/`, this.controller.addNotice.bind(this.controller));
    router.put(`/info`, this.controller.updateNotice.bind(this.controller));
    router.put(`/photo`, this.controller.changePhoto.bind(this.controller));
    router.delete(
      `/photo/:noticeId`,
      this.controller.deletePhoto.bind(this.controller)
    );
    router.delete(
      `/delete/:noticeId`,
      this.controller.deleteNotice.bind(this.controller)
    );
    return router;
  }
}

module.exports = NoticeRouter;
