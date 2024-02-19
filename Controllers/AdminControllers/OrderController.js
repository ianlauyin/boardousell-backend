const { Op } = require("sequelize");
class OrderController {
  constructor(db) {
    this.order = db.order;
    this.product = db.product;
    this.user = db.user;
    this.message = db.message;
    this.resultPerPage = 5;
  }

  searchProduct = async (req, res) => {
    const { product, page } = req.query;
    if (isNaN(Number(page))) {
      return res.status(400).json({ error: true, msg: "Wrong Page" });
    }
    const offset = page - 1;
    try {
      const rawData = await this.order.findAll({
        include: [
          {
            model: this.user,
            attributes: ["email", "name", "phone"],
          },
          {
            model: this.product,
            attributes: ["id", "name"],
            through: { attributes: ["amount"] },
            where: { name: { [Op.iLike]: `%${product}%` } },
          },
          { model: this.message },
        ],
        order: [["createdAt", "DESC"]],
      });
      const count = rawData.length;
      const data = rawData.slice(
        offset * this.resultPerPage,
        page * this.resultPerPage
      );
      return res.json({ count: count, data: data });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  searchEmail = async (req, res) => {
    const { email, page } = req.query;
    if (isNaN(Number(page))) {
      return res.status(400).json({ error: true, msg: "Wrong Page" });
    }
    const offset = page - 1;
    try {
      const rawData = await this.order.findAll({
        include: [
          {
            model: this.user,
            attributes: ["email", "name", "phone"],
            where: { email: { [Op.iLike]: `%${email}%` } },
          },
          {
            model: this.product,
            attributes: ["id", "name"],
            through: { attributes: ["amount"] },
          },
          { model: this.message },
        ],
        order: [["createdAt", "DESC"]],
      });
      const count = rawData.length;
      const data = rawData.slice(
        offset * this.resultPerPage,
        page * this.resultPerPage
      );
      return res.json({ count: count, data: data });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  searchStatus = async (req, res) => {
    const { status, page } = req.query;
    if (isNaN(Number(page))) {
      return res.status(400).json({ error: true, msg: "Wrong Page" });
    }
    const checkingStatus = [
      "Pending",
      "Paid",
      "Ready",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    if (!checkingStatus.includes(status)) {
      return res.status(400).json({ error: true, msg: "Wrong Status" });
    }
    const offset = page - 1;
    try {
      const count = await this.order.count({ where: { status: status } });
      const data = await this.order.findAll({
        where: { status: status },
        include: [
          { model: this.user, attributes: ["email", "name", "phone"] },
          {
            model: this.product,
            attributes: ["id", "name"],
            through: { attributes: ["amount"] },
          },
          this.message,
        ],
        order: [["updatedAt", "DESC"]],
        limit: this.resultPerPage,
        offset: offset * this.resultPerPage,
      });
      return res.json({ count: count, data: data });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  sortMessage = async (req, res) => {
    const { sort, page } = req.query;
    if (isNaN(Number(page))) {
      return res.status(400).json({ error: true, msg: "Wrong Page" });
    }
    if (!(sort === "ASC" || sort === "DESC")) {
      return res.status(400).json({ error: true, msg: "Wrong Message Order" });
    }
    const offset = page - 1;
    try {
      const rawData = await this.order.findAll({
        order: [[this.message, "createdAt", sort]],
        include: [
          { model: this.user, attributes: ["email", "name", "phone"] },
          {
            model: this.product,
            attributes: ["id", "name"],
            through: { attributes: ["amount"] },
          },
          { model: this.message, required: true },
        ],
      });
      const count = rawData.length;
      const data = rawData.slice(
        offset * this.resultPerPage,
        page * this.resultPerPage
      );
      return res.json({ count: count, data: data });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getOrder = async (req, res) => {
    const { orderId } = req.params;
    if (isNaN(Number(orderId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of orderID" });
    }
    try {
      const data = await this.order.findByPk(orderId, {
        include: [
          { model: this.user, attributes: ["email", "name", "phone"] },
          {
            model: this.product,
            attributes: ["id", "name"],
            through: { attributes: ["amount"] },
          },
          this.message,
        ],
      });
      return res.json({ count: 1, data: [data] });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateOrderStatus = async (req, res) => {
    const { status, orderId } = req.body;
    if (isNaN(Number(orderId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of orderID" });
    }
    const valid = [
      "Pending",
      "Paid",
      "Ready",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    if (!valid.includes(status)) {
      return res.status(400).json({ error: true, msg: "Wrong Status" });
    }
    try {
      const order = await this.order.findByPk(orderId);
      if (status === "Cancelled" && order.status === "Cancelled") {
        throw new Error("The Order is already cancelled before.");
      }
      if (status === "Cancelled") {
        const products = await order.getProducts();
        for (const product of products) {
          product.stock += product.productorder.amount;
          await product.save();
        }
      }
      await order.update({ status });
      const data = await this.order.findByPk(orderId, {
        include: [
          { model: this.user, attributes: ["email", "name", "phone"] },
          {
            model: this.product,
            attributes: ["id", "name"],
            through: { attributes: ["amount"] },
          },
          this.message,
        ],
      });
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = OrderController;
