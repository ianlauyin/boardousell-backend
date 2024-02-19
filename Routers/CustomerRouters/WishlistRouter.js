const express = require("express");
const router = express.Router();

class WishlistRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      `/info/:userId`,
      this.controller.getWishlist.bind(this.controller)
    );
    router.post(`/`, this.controller.addWishItem.bind(this.controller));
    router.delete(
      "/:wishlistId",
      this.controller.deleteWishItem.bind(this.controller)
    );
    return router;
  }
}

module.exports = WishlistRouter;
