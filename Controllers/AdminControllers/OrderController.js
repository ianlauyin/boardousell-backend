const { Op } = require("sequelize");
class OrderController {
  constructor(db) {
    this.order = db.order;
    this.product = db.product;
    this.user = db.user;
    this.message = db.message;
    this.sequelize = db.sequelize;
  }

  searchOrder = async (req, res) => {
    const { limit, page } = req.query;
    if (!!page && !limit) {
      return res.status(400).json({ error: true, msg: "Require limit" });
    }
    if (!!limit && isNaN(Number(limit))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of limit" });
    }
    if (!!page && isNaN(Number(page))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of page" });
    }
    if (req.query.sort === "message") {
      return this.sortMessage(page, limit, req.query.order, res);
    }
    if (req.query.product) {
      return this.searchProduct(page, limit, req.query.product, res);
    }
    if (req.query.email) {
      return this.searchEmail(page, limit, req.query.email, res);
    }
    const offset = page ? (page - 1) * limit : 0;
    const resultLimitation = !!limit ? { offset: offset, limit: limit } : {};
    if (req.query.id) {
      if (isNaN(Number(req.query.id))) {
        return res
          .status(400)
          .json({ error: true, msg: "Wrong Type of orderID" });
      }
      return this.searchOrderDetail(
        resultLimitation,
        { id: req.query.id },
        res
      );
    }
    if (req.query.status) {
      const checkingStatus = [
        "Pending",
        "Paid",
        "Ready",
        "Shipped",
        "Delivered",
        "Cancelled",
      ];
      if (!checkingStatus.includes(req.query.status)) {
        return res.status(400).json({ error: true, msg: "Wrong Status" });
      }
      return this.searchOrderDetail(
        resultLimitation,
        { status: req.query.status },
        res
      );
    }
    return res
      .status(400)
      .json({ error: true, msg: "Currently not supporting your search type." });
  };

  searchOrderDetail = async (limitation, searchObject, res) => {
    try {
      const count = await this.order.count({ where: searchObject });
      const data = await this.order.findAll({
        where: searchObject,
        include: [
          { model: this.user, attributes: { exclude: ["uuid"] } },
          {
            model: this.product,
            through: { attributes: ["amount"] },
          },
          this.message,
        ],
        order: [["updatedAt", "DESC"]],
        ...limitation,
      });
      return res.json({ count: count, data: data });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  searchProduct = async (page, limit, keyword, res) => {
    try {
      const allData = await this.order.findAll({
        include: [
          { model: this.user, attributes: { exclude: ["uuid"] } },
          {
            model: this.product,
            through: { attributes: ["amount"] },
            where: { name: { [Op.iLike]: `%${keyword}%` } },
          },
          { model: this.message },
        ],
        order: [["updatedAt", "DESC"]],
      });
      const data = allData.slice((page - 1) * limit, page * limit);
      return res.json({ amount: allData.length, data: data });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  searchEmail = async (page, limit, keyword, res) => {
    try {
      const allData = await this.order.findAll({
        include: [
          {
            model: this.user,
            attributes: { exclude: ["uuid"] },
            where: { email: { [Op.iLike]: `%${keyword}%` } },
          },
          {
            model: this.product,
            through: { attributes: ["amount"] },
          },
          this.message,
        ],
        order: [["updatedAt", "DESC"]],
      });
      const data = allData.slice((page - 1) * limit, page * limit);
      return res.json({ amount: allData.length, data: data });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  sortMessage = async (page, limit, order, res) => {
    if (!(order === "ASC" || order === "DESC")) {
      return res.status(400).json({ error: true, msg: "Wrong Message Order" });
    }
    try {
      //Sequelize does not support limit after sort for association order
      const allData = await this.order.findAll({
        order: [[this.message, "createdAt", order]],
        include: [
          { model: this.user, attributes: { exclude: ["uuid"] } },
          { model: this.product, through: ["amount"] },
          { model: this.message, required: true },
        ],
      });
      const data = allData.slice((page - 1) * limit, page * limit);
      return res.json({ amount: allData.length, data: data });
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
    const t = this.sequelize.transaction();
    try {
      const order = await this.order.findByPk(orderId);
      if (status === "Cancelled" && order.status === "Cancelled") {
        throw new Error("The Order is already cancelled before.");
      }
      if (status === "Cancelled") {
        const products = await order.getProducts();
        for (const product of products) {
          product.stock += product.productorder.amount;
          await product.save({ transaction: t });
        }
      }
      await order.update({ status }, { transaction: t });
      const data = await this.order.findByPk(orderId, {
        include: [
          { model: this.user, attributes: { exclude: ["uuid"] } },
          { model: this.product, through: ["amount"] },
          this.message,
        ],
      });
      await t.commit();
      return res.json(data);
    } catch (error) {
      await t.rollback();
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = OrderController;
