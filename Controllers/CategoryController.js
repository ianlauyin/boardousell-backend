class CategoryController {
  constructor(db) {
    this.category = db.category;
    this.product = db.product;
    this.productPhoto = db.productPhoto;
    this.onsale = db.onsale;
  }

  getExploreProducts = async (req, res) => {
    try {
      const categorySize = await this.category.count();
      const randomIndexFirst = Math.floor(Math.random() * categorySize) + 1;
      let randomIndexSecond = Math.floor(Math.random() * categorySize) + 1;
      while (randomIndexFirst === randomIndexSecond) {
        randomIndexSecond = Math.floor(Math.random() * categorySize) + 1;
      }
      const categoryIds = [randomIndexFirst, randomIndexSecond];
      const exploreProducts = { categories: [], productLists: [] };
      for (const id of categoryIds) {
        const categoryInfo = await this.category.findByPk(id);
        exploreProducts.categories.push(categoryInfo.name);
        const products = await categoryInfo.getProducts({
          attributes: {
            exclude: ["description", "createdAt", "updatedAt"],
          },
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
        exploreProducts.productLists.push(products);
      }
      return res.json(exploreProducts);
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
