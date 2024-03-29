class CartController {
  constructor(db) {
    this.cart = db.cart;
    this.product = db.product;
    this.user = db.user;
    this.onsale = db.onsale;
  }

  getCart = async (req, res) => {
    const { userId } = req.params;
    if (isNaN(Number(userId))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of UserID" });
    }
    try {
      const user = await this.user.findByPk(userId);
      const cart = await user.getCarts({
        attributes: ["id"],
        include: [
          {
            model: this.product,
            attributes: ["id", "name", "stock", "price"],
            include: { model: this.onsale, attributes: ["discount"] },
          },
        ],
      });
      return res.json(cart);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  addCartItem = async (req, res) => {
    const { userId, productId } = req.body;
    if (isNaN(Number(userId)) || isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of UserID or ProductID" });
    }
    try {
      const cartItem = await this.cart.create({
        userId,
        productId,
      });
      const newItem = await this.cart.findByPk(cartItem.id, {
        attributes: ["id"],
        include: [
          {
            model: this.product,
            attributes: ["id", "name", "stock", "price"],
            include: {
              model: this.onsale,
              attributes: ["discount"],
            },
          },
        ],
      });

      return res.json(newItem);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  deleteCartItem = async (req, res) => {
    const { cartId } = req.params;
    if (isNaN(Number(cartId))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of CartID" });
    }
    try {
      await this.cart.destroy({
        where: { id: cartId },
      });
      return res.json("Deleted");
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = CartController;
