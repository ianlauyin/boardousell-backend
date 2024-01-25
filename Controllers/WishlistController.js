class WishlistController {
  constructor(db) {
    this.wishlist = db.wishlist;
    this.user = db.user;
    this.product = db.product;
  }

  getWishlists = async (req, res) => {
    const { userEmail } = req.body;
    try {
      const user = await this.user.findOne({ where: { email: userEmail } });
      const wishlists = await user.getWishlists({
        attributes: [],
        include: [{ model: this.product, attributes: ["name", "stocks"] }],
      });
      return res.json(wishlists);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = WishlistController;
