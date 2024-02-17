class WishlistController {
  constructor(db) {
    this.wishlist = db.wishlist;
    this.user = db.user;
    this.product = db.product;
    this.onsale = db.onsale;
  }

  getWishlists = async (req, res) => {
    const { userId } = req.params;
    if (isNaN(Number(userId))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of userID" });
    }
    try {
      const user = await this.user.findByPk(userId);
      const wishlists = await user.getWishlists({
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
      return res.json(wishlists);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  addWishItem = async (req, res) => {
    const { userId, productId } = req.body;
    if (isNaN(Number(userId)) || isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of userID/productID" });
    }
    try {
      const wishItem = await this.wishlist.create({
        userId,
        productId,
      });
      const newItem = await this.wishlist.findByPk(wishItem.id, {
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

  deleteWishItem = async (req, res) => {
    const { wishlistId } = req.params;
    if (isNaN(Number(wishlistId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of wishlistId" });
    }
    try {
      await this.wishlist.destroy({
        where: { id: wishlistId },
      });
      return res.json("Deleted");
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = WishlistController;
