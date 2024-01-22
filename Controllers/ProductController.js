class ProductController {
  constructor(db) {
    this.product = db.product;
    this.newproduct = db.newproduct;
  }

  getNewProduct = async (req, res) => {
    try {
      const newProduct = await this.newproduct.findAll({
        include: this.product,
      });
      return res.json(newProduct);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = ProductController;
