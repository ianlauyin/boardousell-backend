class CategoryController {
  constructor(db) {
    this.category = db.category;
    this.productPhoto = db.productPhoto;
    this.onsale = db.onsale;
  }

  getAllCategory = async (req, res) => {
    try {
      const data = await this.category.findAll();
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getRelatedProducts = async (req, res) => {
    const { categoryId } = req.params;
    if (isNaN(Number(categoryId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of Category Id" });
    }
    try {
      const category = await this.category.findByPk(categoryId);
      const data = await category.getProducts({
        attributes: ["id", "name"],
        joinTableAttributes: [],
      });
      return res.json(data);
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
