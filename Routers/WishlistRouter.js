const express = require("express");
const router = express.Router();

class WishlistRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(`/:userId`, this.controller.getWishlists.bind(this.controller));
    return router;
  }
}

module.exports = WishlistRouter;
