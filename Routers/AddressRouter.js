const express = require("express");
const router = express.Router();

class AddressRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    return router;
  }
}

module.exports = AddressRouter;
