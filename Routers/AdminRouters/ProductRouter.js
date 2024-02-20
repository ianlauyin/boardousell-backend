const express = require("express");
const router = express.Router();

class ProductRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      `/all/:page`,
      this.controller.getAllProducts.bind(this.controller)
    );
    router.get(
      `/category/:category/:page`,
      this.controller.searchCategory.bind(this.controller)
    );
    router.get(
      `/stock/:amount/:page`,
      this.controller.searchStock.bind(this.controller)
    );
    router.get(
      `/name/:name/:page`,
      this.controller.searchName.bind(this.controller)
    );
    router.post(`/create`, this.controller.createProduct.bind(this.controller));
    router.post(`/photo`, this.controller.addPhoto.bind(this.controller));
    router.put(
      `/photo/thumbnail`,
      this.controller.changeThumbnail.bind(this.controller)
    );
    router.put(
      `/newProduct/:productId`,
      this.controller.updateNewProduct.bind(this.controller)
    );
    router.put(
      `/onsale/:productId`,
      this.controller.updateOnsale.bind(this.controller)
    );
    router.put(
      `/info/:productId`,
      this.controller.updateProductInfo.bind(this.controller)
    );
    router.put(
      `/discount/:onsaleId`,
      this.controller.updateDiscount.bind(this.controller)
    );
    router.delete(
      `/photo/:photoId`,
      this.controller.deletePhoto.bind(this.controller)
    );

    return router;
  }
}

module.exports = ProductRouter;
