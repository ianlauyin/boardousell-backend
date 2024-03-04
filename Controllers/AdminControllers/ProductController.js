const { Op } = require("sequelize");

class ProductController {
  constructor(db) {
    this.product = db.product;
    this.newproduct = db.newproduct;
    this.productPhoto = db.productPhoto;
    this.onsale = db.onsale;
    this.category = db.category;
    this.sequelize = db.sequelize;
  }

  searchStock = async (req, res) => {
    const { amount } = req.params;
    const { limit, page } = req.query;
    if (!!page && !limit) {
      return res.status(400).json({ error: true, msg: "Require limit" });
    }
    if (!!limit && isNaN(Number(limit))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of limit" });
    }
    if (!!page && isNaN(Number(page))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of page" });
    }
    const arr = amount.split("-");
    for (const limit of arr) {
      if (isNaN(Number(limit))) {
        return res.status(400).json({ error: true, msg: "Wrong Input" });
      }
    }
    const lowerLimit = arr[0];
    const upperLimit = arr[1] ? arr[1] : arr[0];
    const condition = {
      where: { stock: { [Op.between]: [lowerLimit, upperLimit] } },
    };
    const offset = page ? (page - 1) * limit : 0;
    const resultLimitation = !!limit ? { offset: offset, limit: limit } : {};
    try {
      const count = await this.product.count(condition);

      const data = await this.product.findAll({
        ...condition,
        order: [["stock", "DESC"]],
        include: [
          this.productPhoto,
          { model: this.category, through: { attributes: [] } },
          this.newproduct,
          this.onsale,
        ],
        ...resultLimitation,
      });
      return res.json({ amount: count, data: data });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  createProduct = async (req, res) => {
    const { categories, isNewProduct, isOnsale, discount, ...newProduct } =
      req.body;
    if (isNaN(Number(newProduct.price))) {
      return res.status(400).json({ error: true, msg: "Wrong type of Price" });
    }
    if (!!isOnsale && isNaN(Number(discount))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong type of discount" });
    }
    const t = this.sequelize.transaction();
    try {
      const product = await this.product.create(newProduct, { transaction: t });
      if (isNewProduct) {
        await this.newproduct.create(
          { productId: product.id },
          { transaction: t }
        );
      }
      if (isOnsale) {
        await this.onsale.create(
          { productId: product.id, discount },
          { transaction: t }
        );
      }
      const categoryInstances = [];
      for (const name of categories) {
        const category = await this.category.findOne({ where: { name: name } });
        categoryInstances.push(category);
      }
      await product.setCategories(categoryInstances, { transaction: t });
      const data = await this.product.findByPk(product.id, {
        include: [
          this.productPhoto,
          { model: this.category, through: { attributes: [] } },
          this.newproduct,
          this.onsale,
        ],
      });
      await t.commit();
      return res.json(data);
    } catch (error) {
      await t.rollback();
      return res.status(400).json({ error: true, msg: error });
    }
  };

  addPhoto = async (req, res) => {
    const { productId } = req.body;
    if (isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of Product Id" });
    }
    const newPhotoData = req.body;
    try {
      const checking = await this.productPhoto.count({
        where: { productId: productId },
      });
      const data = await this.productPhoto.create({
        ...newPhotoData,
        ...(checking === 0 && { thumbnail: true }),
      });
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateOnsale = async (req, res) => {
    const { relation, productId } = req.body;
    if (isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of product Id" });
    }
    try {
      if (relation) {
        const checking = await this.onsale.findOne({
          where: { productId: productId },
        });
        if (checking) {
          throw new Error("Already exist");
        }
        const data = await this.onsale.create({ productId });
        return res.json(data);
      } else {
        await this.onsale.destroy({ where: { productId: productId } });
        return res.json("Updated");
      }
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateNewProduct = async (req, res) => {
    const { relation, productId } = req.body;
    if (isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of product Id" });
    }
    try {
      if (relation) {
        const checking = await this.newproduct.findOne({
          where: { productId: productId },
        });
        if (checking) {
          throw new Error("Already exist");
        }
        const data = await this.newproduct.create({ productId });
        return res.json(data);
      } else {
        await this.newproduct.destroy({ where: { productId: productId } });
        return res.json("Updated");
      }
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateProductInfo = async (req, res) => {
    const { productId, ...newInfo } = req.body;
    if (isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of product Id" });
    }
    if (newInfo.stock && isNaN(Number(newInfo.stock))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of stock" });
    }
    if (newInfo.price && isNaN(Number(newInfo.price))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of price" });
    }
    try {
      await this.product.update(newInfo, { where: { id: productId } });
      const data = await this.product.findByPk(productId, {
        include: [
          this.productPhoto,
          { model: this.category, through: { attributes: [] } },
          this.newproduct,
          this.onsale,
        ],
      });
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateDiscount = async (req, res) => {
    const { discount, onsaleId } = req.body;
    if (isNaN(Number(onsaleId) || isNaN(Number(discount)))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of onsale Id/discount" });
    }
    try {
      const data = await this.onsale.update(
        { discount: discount },
        { where: { id: onsaleId }, returning: true }
      );
      return res.json(data[1][0]);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  changeThumbnail = async (req, res) => {
    const { photoId } = req.body;
    if (isNaN(Number(photoId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of Photo Id" });
    }
    const t = this.sequelize.transaction();
    try {
      const photo = await this.productPhoto.findByPk(photoId);
      const { productId } = photo;
      const oldThumbnail = await this.productPhoto.update(
        { thumbnail: false },
        {
          where: { [Op.and]: [{ productId: productId }, { thumbnail: true }] },
          transaction: t,
          returning: true,
        }
      );
      await this.productPhoto.update(
        { thumbnail: true },
        { where: { id: photoId }, transaction: t }
      );
      await t.commit();
      return res.json({ oldThumbnailPhotoId: oldThumbnail[1][0].id });
    } catch (error) {
      await t.rollback();
      return res.status(400).json({ error: true, msg: error });
    }
  };

  deletePhoto = async (req, res) => {
    const { photoId } = req.params;
    if (isNaN(Number(photoId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of Photo Id" });
    }
    const t = this.sequelize.transaction();
    try {
      const target = await this.productPhoto.findByPk(photoId);
      const { productId } = target;
      if (target.thumbnail) {
        const newThumbnail = await this.productPhoto.findOne({
          where: {
            [Op.and]: [{ productId: productId }, { thumbnail: false }],
          },
        });
        if (!!newThumbnail) {
          await newThumbnail.update({ thumbnail: true }, { transaction: t });
        }
      }
      await target.destroy({ transaction: t });
      await t.commit();
      return res.json("Deleted");
    } catch (error) {
      await t.rollback();
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = ProductController;
