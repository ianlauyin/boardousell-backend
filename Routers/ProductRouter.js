const express = require("express");
const router = express.Router();

class ProductRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      `/admin/category/:category/:page`,
      this.controller.adminSearchCategory.bind(this.controller)
    );
    router.get(
      `/admin/stocks/:amount/:page`,
      this.controller.adminSearchStocks.bind(this.controller)
    );
    router.get(
      `/admin/name/:name/:page`,
      this.controller.adminSearchName.bind(this.controller)
    );
    router.get(
      `/admin/all/:page`,
      this.controller.adminGetAllProducts.bind(this.controller)
    );

    router.put(
      `/photo/thumbnail`,
      this.controller.changeThumbnail.bind(this.controller)
    );
    router.get("/search", this.controller.searchProduct.bind(this.controller));
    router.get(
      "/onsale",
      this.controller.getOnsaleProduct.bind(this.controller)
    );
    router.get(
      "/newProduct",
      this.controller.getNewProduct.bind(this.controller)
    );
    router.delete(
      `/photo/:photoId`,
      this.controller.deletePhoto.bind(this.controller)
    );
    router.get(
      "/info/:productId",
      this.controller.getProductInfo.bind(this.controller)
    );
    return router;
  }
}

module.exports = ProductRouter;
