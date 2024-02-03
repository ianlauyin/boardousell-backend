class ProductController {
  constructor(db) {
    this.product = db.product;
    this.newproduct = db.newproduct;
    this.productPhoto = db.productPhoto;
    this.onsale = db.onsale;
    this.category = db.category;
  }

  searchProduct = async (req, res) => {
    try {
      const { query } = req;
      const includeSearchCategory = query.category
        ? [
            {
              model: this.category,
              where: { name: query.category },
              attributes: [],
              through: { attributes: [] },
            },
          ]
        : [];
      const data = await this.product.findAll({
        attributes: ["id", "name", "price", "stocks", "description"],
        order: [["createdAt", "DESC"]],
        include: [
          { model: this.productPhoto, limit: 1, attributes: ["url"] },
          { model: this.onsale, attributes: ["discount"] },
          ...includeSearchCategory,
        ],
      });
      if ("keyword" in query) {
        const result = data.filter((product) => {
          if (
            product.name.toLowerCase().includes(query.keyword.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(query.keyword.toLowerCase())
          )
            return true;
        });
        return res.json(result);
      }
      return res.json(data);
    } catch (error) {
      res.status(400).json({ error: true, msg: error });
    }
  };

  getOnsaleProduct = async (req, res) => {
    try {
      const products = await this.product.findAll({
        order: [["created_at", "DESC"]],
        attributes: ["id", "price", "name", "stocks"],
        include: [
          {
            attributes: ["discount"],
            model: this.onsale,
            required: true,
          },
          {
            model: this.productPhoto,
            attributes: ["url"],
            limit: 1,
          },
        ],
      });
      return res.json(products);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getProductInfo = async (req, res) => {
    const { productId } = req.params;
    if (isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of productID" });
    }
    try {
      const productDetail = await this.product.findByPk(productId, {
        include: [
          {
            model: this.category,
            attributes: ["name"],
            through: { attributes: [] },
          },
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
