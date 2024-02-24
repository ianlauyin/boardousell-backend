const { Op } = require("sequelize");

class ProductController {
  constructor(db) {
    this.product = db.product;
    this.newproduct = db.newproduct;
    this.productPhoto = db.productPhoto;
    this.onsale = db.onsale;
    this.category = db.category;
  }

  getCategoryProduct = async (req, res) => {
    const { categoryId } = req.params;
    const { limit } = req.query;
    if (isNaN(Number(categoryId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of Category Id" });
    }
    if (!!limit && isNaN(Number(limit))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of limit" });
    }
    try {
      const category = await this.category.findByPk(categoryId);
      const data = await category.getProducts({
        order: [["createdAt", "DESC"]],
        joinTableAttributes: [],
        include: [this.productPhoto, this.onsale],
        limit: limit ? limit : null,
      });
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  searchProduct = async (req, res) => {
    const { keyword, page, limit } = req.query;
    if (!!page && !limit) {
      return res.status(400).json({ error: true, msg: "Require limit" });
    }
    if (!page && !!limit) {
      return res.status(400).json({ error: true, msg: "Require page" });
    }
    if (!!page && isNaN(Number(page))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of page" });
    }
    if (!!limit && isNaN(Number(limit))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of limit" });
    }
    try {
      const searchObject = keyword
        ? { name: { [Op.iLike]: `%${keyword}%` } }
        : {};
      const resultLimitation =
        !!page && !!limit ? { offset: (page - 1) * limit, limit: limit } : {};
      const count = await this.product.count({
        where: searchObject,
      });
      const data = await this.product.findAll({
        where: searchObject,
        include: [
          { model: this.category, through: { attributes: [] } },
          this.productPhoto,
          this.onsale,
        ],
        order: [["createdAt", "DESC"]],
        ...resultLimitation,
      });
      return res.json({ amount: count, data: data });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getOnsaleProducts = async (req, res) => {
    try {
      const products = await this.product.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: this.onsale,
            required: true,
          },
          {
            model: this.productPhoto,
          },
        ],
      });
      return res.json(products);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getNewProducts = async (req, res) => {
    try {
      const products = await this.product.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: this.newproduct,
            required: true,
          },
          this.productPhoto,
          this.onsale,
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
            through: { attributes: [] },
          },
          this.productPhoto,
          this.onsale,
        ],
      });
      return res.json(productDetail);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = ProductController;
