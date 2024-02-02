class ProductController {
  constructor(db) {
    this.product = db.product;
    this.newproduct = db.newproduct;
    this.productPhoto = db.productPhoto;
    this.onsale = db.onsale;
    this.category = db.category;
    this.review = db.review;
    this.user = db.user;
  }

  getProductInfo = async (req, res) => {
    const { productId } = req.params;
    try {
      const productDetail = await this.product.findByPk(productId, {
        include: [
          { model: this.category, attributes: ["name"] },
          { model: this.productPhoto, attributes: ["url"] },
          { model: this.onsale, attributes: ["discount"] },
        ],
      });
      return res.json(productDetail);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

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
          {
            model: this.onsale,
            attributes: ["discount"],
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
