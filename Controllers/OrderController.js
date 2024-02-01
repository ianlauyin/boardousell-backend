class OrderController {
  constructor(db) {
    this.order = db.order;
    this.cart = db.cart;
    this.product = db.product;
    this.productorder = db.productorder;
    this.user = db.user;
    this.level = db.level;
    this.message = db.message;
  }

  paidOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
      const order = await this.order.findByPk(orderId);
      if (order.status !== "Pending") {
        throw new Error("User have already paid this order");
      }
      await order.update({ status: "Paid" });
      const user = await this.user.findByPk(order.userId, {
        include: this.level,
      });
      const newPoints = user.points + order.amount;
      await user.update({
        points: newPoints,
        ...(newPoints >= user.level.requirement && {
          levelId: user.levelId + 1,
        }),
      });
      return res.json("Success");
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  };

  getOrder = async (req, res) => {
    const { orderId } = req.params;
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

  postOrder = async (req, res) => {
    const { address, userId, productIdList, amount } = req.body;
    try {
      const product = {};
      for (const id of productIdList) {
        product[id] ? (product[id] += 1) : (product[id] = 1);
      }
      const productDetailList = [];
      for (const [id, number] of Object.entries(product)) {
        const productDetail = await this.product.findByPk(id);
        if (productDetail.stocks < number) {
          throw new Error("Not Enough Stocks");
        }
        productDetailList.push(productDetail);
      }
      for (const productDetail of productDetailList) {
        const newAmount = productDetail.stocks - product[productDetail.id];
        await productDetail.update({ stocks: newAmount });
      }
      const newOrder = await this.order.create({
        address,
        status: "Pending",
        userId,
        amount,
      });
      for (const [id, number] of Object.entries(product)) {
        await newOrder.addProducts(id, { through: { amount: number } });
      }
      await this.cart.destroy({ where: { userId: userId } });
      return res.json(newOrder.id);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getAllOrder = async (req, res) => {
    const { userId } = req.params;
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
}

module.exports = OrderController;
