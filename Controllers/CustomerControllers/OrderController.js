const { Op } = require("sequelize");
class OrderController {
  constructor(db) {
    this.order = db.order;
    this.cart = db.cart;
    this.product = db.product;
    this.user = db.user;
    this.level = db.level;
    this.message = db.message;
    this.sequelize = db.sequelize;
  }

  getOrder = async (req, res) => {
    const { orderId } = req.params;
    if (isNaN(Number(orderId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of orderID" });
    }
    try {
      const order = await this.order.findByPk(orderId, {
        include: [
          {
            model: this.user,
            attributes: ["points"],
            include: {
              model: this.level,
              attributes: ["title", "requirement"],
            },
          },
          {
            model: this.product,
            attributes: ["id", "name"],
            through: { attributes: ["amount"] },
          },
          {
            model: this.message,
            attributes: { exclude: ["orderId"] },
          },
        ],
      });
      return res.json(order);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getAllOrder = async (req, res) => {
    const { userId } = req.params;
    if (isNaN(Number(userId))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of userID" });
    }
    try {
      const orders = await this.order.findAll({
        where: { userId: userId },
        attributes: { exclude: ["userId", "address"] },
        order: [["createdAt", "DESC"]],
      });
      return res.json(orders);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  paidOrder = async (req, res) => {
    const { orderId } = req.body;
    if (isNaN(Number(orderId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of orderID" });
    }
    const t = this.sequelize.transaction();
    try {
      const order = await this.order.findByPk(orderId);
      if (order.status !== "Pending") {
        throw new Error("User have already paid this order");
      }
      await order.update({ status: "Paid" }, { transaction: t });
      const user = await this.user.findByPk(order.userId, {
        include: this.level,
      });
      const newPoints = user.points + order.amount;
      await user.update(
        {
          points: newPoints,
        },
        { transaction: t }
      );
      const levelInfo = await this.level.findAll({
        attributes: ["id", "requirement"],
        order: [["requirement", "DESC"]],
      });
      user.levelId = 1;
      let prevId = levelInfo[0].id;
      for (const { id, requirement } of levelInfo) {
        if (user.points >= requirement) {
          user.levelId = prevId;
          break;
        }
        prevId = id;
      }
      user.save({ transaction: t });
      await t.commit();
      return res.json("Success");
    } catch (error) {
      await t.rollback();
      return res.status(400).json({ error: true, msg: error.message });
    }
  };

  postOrder = async (req, res) => {
    const { address, userId, productIdList, amount } = req.body;
    if (isNaN(Number(userId)) || isNaN(Number(amount))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of userID/amount" });
    }
    for (const productId of productIdList) {
      if (isNaN(Number(productId))) {
        return res
          .status(400)
          .json({ error: true, msg: "Wrong Type of productID" });
      }
    }
    const t = this.sequelize.transaction();
    try {
      const product = {};
      for (const id of productIdList) {
        product[id] ? (product[id] += 1) : (product[id] = 1);
      }
      const productDetailList = [];
      for (const [id, number] of Object.entries(product)) {
        const productDetail = await this.product.findByPk(id);
        if (productDetail.stock < number) {
          throw new Error("Not Enough stock");
        }
        productDetailList.push(productDetail);
      }
      for (const productDetail of productDetailList) {
        const newAmount = productDetail.stock - product[productDetail.id];
        await productDetail.update({ stock: newAmount }, { transaction: t });
      }
      const newOrder = await this.order.create(
        {
          address,
          status: "Pending",
          userId,
          amount,
        },
        { transaction: t }
      );
      for (const [id, number] of Object.entries(product)) {
        await newOrder.addProducts(id, {
          through: { amount: number },
          transaction: t,
        });
      }
      await this.cart.destroy({ where: { userId: userId }, transaction: t });
      await t.commit();
      return res.json(newOrder.id);
    } catch (error) {
      await t.rollback();
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = OrderController;
