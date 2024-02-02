const express = require("express");
const router = express.Router();

class ProductRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/newProduct",
      this.controller.getNewProduct.bind(this.controller)
    );
    router.get(
      "/info/:productId",
      this.controller.getProductInfo.bind(this.controller)
    );
    return router;
  }
}

module.exports = ProductRouter;
