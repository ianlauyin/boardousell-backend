class CategoryController {
  constructor(db) {
    this.category = db.category;
    this.product = db.product;
    this.productPhoto = db.productPhoto;
    this.onsale = db.onsale;
  }

  getSuggestProducts = async (req, res) => {
    const { category } = req.params;
    try {
      const categoryInfo = await this.category.findOne({
        where: { name: category },
      });
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
            limit: 1,
          },
        ],
      });
      return res.json(products);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = CategoryController;
