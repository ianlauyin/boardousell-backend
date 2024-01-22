class ProductController {
  constructor(db) {
    this.product = db.product;
  }

  getNewProduct = async (req, res) => {
    try {
      const newProduct = await this.product.findAll();
      return res.json(newProduct);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = ProductController;
