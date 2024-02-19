const express = require("express");
const router = express.Router();

class CategoryRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
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
