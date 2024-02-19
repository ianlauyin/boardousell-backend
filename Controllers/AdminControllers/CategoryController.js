class CategoryController {
  constructor(db) {
    this.category = db.category;
    this.product = db.product;
    this.productPhoto = db.productPhoto;
    this.onsale = db.onsale;
    this.newproduct = db.newproduct;
  }

  getAdminUpdateProduct = async (productId) => {
    const data = await this.product.findByPk(productId, {
      include: [
        this.productPhoto,
        { model: this.category, through: { attributes: [] } },
        this.newproduct,
        this.onsale,
      ],
    });
    return data;
  };

  changeRelationWithProduct = async (req, res) => {
    const { link, category, productId } = req.body;
    if (isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of Product Id" });
    }
    try {
      const product = await this.product.findByPk(productId);
      const categoryInfo = await this.category.findOne({
        where: { name: category },
      });
      if (link) {
        await product.addCategories(categoryInfo);
      } else {
        await product.removeCategories(categoryInfo);
      }
      const data = await this.getAdminUpdateProduct(productId);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  addCategory = async (req, res) => {
    const newCategory = req.body;
    try {
      const data = await this.category.create(newCategory);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
      const target = await this.category.findByPk(categoryId);
      await target.setProducts([]);
      await target.destroy();
      return res.json("Deleted");
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = CategoryController;
