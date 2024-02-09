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

  addProductToCategory = async (req, res) => {
    const { category, productId } = req.body;
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
      await product.addCategories(categoryInfo);
      const data = await this.getAdminUpdateProduct(productId);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  adminGetAllCategory = async (req, res) => {
    try {
      const data = await this.category.findAll();
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

  getAllCategory = async (req, res) => {
    try {
      const categoryList = await this.category.findAll({
        attributes: ["name"],
      });
      const categories = categoryList.map((item) => item.name);
      return res.json(categories);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getSuggestProducts = async (req, res) => {
    const { category } = req.params;
    try {
      const categoryInfo = await this.category.findOne({
        where: { name: category },
      });
      if (!categoryInfo) {
        throw new Error("No Such Category");
      }
      const products = await categoryInfo.getProducts({
        attributes: { exclude: ["description", "createdAt", "updatedAt"] },
        order: [["createdAt", "DESC"]],
        limit: 12,
        joinTableAttributes: [],
        include: [
          { model: this.onsale, attributes: ["discount"] },
          {
            model: this.productPhoto,
            attributes: ["url"],
            separate: true,
            where: { thumbnail: true },
          },
        ],
      });
      return res.json(products);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error.message });
    }
  };
}

module.exports = CategoryController;
