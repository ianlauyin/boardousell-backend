class OrderController {
  constructor(db) {
    this.order = db.order;
    this.cart = db.cart;
  }

  postOrder = async (req, res) => {
    const { address, userId, productList } = req.body;
    try {
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = OrderController;
