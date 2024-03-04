class CategoryController {
  constructor(db) {
    this.category = db.category;
    this.product = db.product;
    this.productPhoto = db.productPhoto;
    this.onsale = db.onsale;
    this.newproduct = db.newproduct;
    this.sequelize = db.sequelize;
  }

  changeRelationWithProduct = async (req, res) => {
    const { relation, categoryId, productId } = req.body;
    if (isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of Product Id" });
    }
    if (isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of Category Id" });
    }
    try {
      const product = await this.product.findByPk(productId);
      const categoryInfo = await this.category.findByPk(categoryId);
      if (relation) {
        await product.addCategories(categoryInfo);
      } else {
        await product.setCategories([]);
      }
      return res.json("Updated");
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  addCategory = async (req, res) => {
    const newCategory = req.body;
    if (!newCategory.name) {
      return res.status(400).json({ error: true, msg: "Need data to create" });
    }
    try {
      const data = await this.category.create(newCategory);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    const t = this.sequelize.transaction();
    try {
      const target = await this.category.findByPk(categoryId);
      await target.setProducts([], { transaction: t });
      await target.destroy({ transaction: t });
      await t.commit();
      return res.json("Deleted");
    } catch (error) {
      await t.rollback();
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = CategoryController;
