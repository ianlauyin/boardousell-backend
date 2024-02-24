const express = require("express");
const router = express.Router();

class ProductRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/category/:categoryId",
      this.controller.getCategoryProducts.bind(this.controller)
    );
    router.get("/search", this.controller.searchProducts.bind(this.controller));
    router.get(
      "/onsale",
      this.controller.getOnsaleProducts.bind(this.controller)
    );
    router.get("/new", this.controller.getNewProducts.bind(this.controller));

    router.get(
      "/:productId",
      this.controller.getProductInfo.bind(this.controller)
    );
    return router;
  }
}

module.exports = ProductRouter;
