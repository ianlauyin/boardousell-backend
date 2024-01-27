class CartController {
  constructor(db) {
    this.cart = db.cart;
    this.product = db.product;
    this.user = db.user;
  }

  getCart = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await this.user.findByPk(userId);
      const cart = await user.getCarts({
        attributes: ["id"],
        include: [
          { model: this.product, attributes: ["name", "stocks", "price"] },
        ],
      });
      return res.json(cart);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = CartController;
