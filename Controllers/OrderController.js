class OrderController {
  constructor(db) {
    this.order = db.order;
    this.cart = db.cart;
  }

  getOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await this.order.findByPk(orderId);
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
      const newOrder = await this.order.create({
        address,
        status: "pending",
        userId,
        amount,
      });
      return res.json(newOrder);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = OrderController;
