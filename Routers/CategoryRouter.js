const express = require("express");
const router = express.Router();

class CategoryRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      `/admin/all`,
      this.controller.adminGetAllCategory.bind(this.controller)
    );
    router.get(`/all`, this.controller.getAllCategory.bind(this.controller));
    router.get(
      `/product/:categoryId`,
      this.controller.getLinkingProducts.bind(this.controller)
    );
    router.get(
      `/suggest/:category`,
      this.controller.getSuggestProducts.bind(this.controller)
    );
    router.put(
      `/product`,
      this.controller.changeRelationWithProduct.bind(this.controller)
    );
    router.put(`/`, this.controller.addCategory.bind(this.controller));
    router.delete(
      `/:categoryId`,
      this.controller.deleteCategory.bind(this.controller)
    );
    return router;
  }
}

module.exports = CategoryRouter;
