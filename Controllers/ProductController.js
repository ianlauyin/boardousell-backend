class ProductController {
  constructor(db) {
    this.product = db.product;
    this.newproduct = db.newproduct;
    this.productPhoto = db.productPhoto;
  }

  getNewProduct = async (req, res) => {
    try {
      const newProduct = await this.product.findAll({
        order: [["created_at", "DESC"]],
        attributes: ["id", "price", "name", "stocks"],
        include: [
          {
            attributes: [],
            model: this.newproduct,
            required: true,
          },
          {
            model: this.productPhoto,
            attributes: ["url"],
            limit: 1,
          },
        ],
      });
      return res.json(newProduct);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = ProductController;
