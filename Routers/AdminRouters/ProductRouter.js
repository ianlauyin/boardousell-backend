const express = require("express");
const router = express.Router();

class ProductRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      `/stock/:amount`,
      this.controller.searchStock.bind(this.controller)
    );
    router.post(`/create`, this.controller.createProduct.bind(this.controller));
    router.post(`/photo`, this.controller.addPhoto.bind(this.controller));
    router.put(
      `/photo/thumbnail`,
      this.controller.changeThumbnail.bind(this.controller)
    );
    router.put(
      `/newproduct`,
      this.controller.updateNewProduct.bind(this.controller)
    );
    router.put(`/onsale`, this.controller.updateOnsale.bind(this.controller));
    router.put(
      `/discount`,
      this.controller.updateDiscount.bind(this.controller)
    );
    router.put(`/`, this.controller.updateProductInfo.bind(this.controller));
    router.delete(
      `/photo/:photoId`,
      this.controller.deletePhoto.bind(this.controller)
    );

    return router;
  }
}

module.exports = ProductRouter;
