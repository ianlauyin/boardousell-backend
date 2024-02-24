const { Op } = require("sequelize");

class ProductController {
  constructor(db) {
    this.product = db.product;
    this.newproduct = db.newproduct;
    this.productPhoto = db.productPhoto;
    this.onsale = db.onsale;
    this.category = db.category;
    this.resultPerPage = 5;
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

  searchStock = async (req, res) => {
    const { amount, page } = req.params;
    if (isNaN(Number(page))) {
      return res.status(400).json({ error: true, msg: "Wrong Page" });
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
    const offset = page - 1;
    try {
      const count = await this.product.count(condition);
      const data = await this.product.findAll({
        ...condition,
        order: [["id", "DESC"]],
        include: [
          this.productPhoto,
          { model: this.category, through: { attributes: [] } },
          this.newproduct,
          this.onsale,
        ],
        limit: this.resultPerPage,
        offset: offset * this.resultPerPage,
      });
      return res.json({ count: count, data: data });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  searchName = async (req, res) => {
    const { name, page } = req.params;
    if (isNaN(Number(page))) {
      return res.status(400).json({ error: true, msg: "Wrong Page" });
    }
    const offset = page - 1;
    const condition = { where: { name: { [Op.iLike]: `%${name}%` } } };
    try {
      const count = await this.product.count(condition);
      const data = await this.product.findAll({
        ...condition,
        order: [["id", "DESC"]],
        include: [
          this.productPhoto,
          { model: this.category, through: { attributes: [] } },
          this.newproduct,
          this.onsale,
        ],
        limit: this.resultPerPage,
        offset: offset * this.resultPerPage,
      });
      return res.json({ count: count, data: data });
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  createProduct = async (req, res) => {
    const newProduct = req.body;
    try {
      const data = await this.product.create(newProduct);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  addPhoto = async (req, res) => {
    if (isNaN(Number(req.body.productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of Product Id" });
    }
    const newPhotoData = req.body;
    try {
      const checking = await this.productPhoto.count({
        where: { productId: req.body.productId },
      });
      await this.productPhoto.create({
        ...newPhotoData,
        ...(checking === 0 && { thumbnail: true }),
      });
      const data = await this.getAdminUpdateProduct(req.body.productId);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateOnsale = async (req, res) => {
    const { productId } = req.params;
    const { isNew } = req.body;
    if (isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of product Id" });
    }
    try {
      if (isNew) {
        const checking = await this.onsale.findOne({
          where: { productId: productId },
        });
        if (checking) {
          throw new Error("Already exist");
        }
        await this.onsale.create({ productId });
      } else {
        await this.onsale.destroy({ where: { productId: productId } });
      }
      const data = await this.getAdminUpdateProduct(productId);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateNewProduct = async (req, res) => {
    const { productId } = req.params;
    const { isNew } = req.body;
    if (isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of product Id" });
    }
    try {
      if (isNew) {
        const checking = await this.newproduct.findOne({
          where: { productId: productId },
        });
        if (checking) {
          throw new Error("Already exist");
        }
        await this.newproduct.create({ productId });
      } else {
        await this.newproduct.destroy({ where: { productId: productId } });
      }
      const data = await this.getAdminUpdateProduct(productId);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateProductInfo = async (req, res) => {
    const { productId } = req.params;
    const newInfo = req.body;
    if (isNaN(Number(productId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of product Id" });
    }
    if (newInfo.stks && isNaN(Number(newInfo.stock))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of stock" });
    }
    if (newInfo.price && isNaN(Number(newInfo.price))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of price" });
    }
    try {
      await this.product.update(newInfo, { where: { id: productId } });
      const data = await this.getAdminUpdateProduct(productId);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateDiscount = async (req, res) => {
    const { onsaleId } = req.params;
    const { discount } = req.body;
    if (isNaN(Number(onsaleId) || isNaN(Number(discount)))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of onsale Id/discount" });
    }
    try {
      await this.onsale.update(
        { discount: discount },
        { where: { id: onsaleId } }
      );
      const data = await this.product.findOne({
        include: [
          this.productPhoto,
          { model: this.category, through: { attributes: [] } },
          this.newproduct,
          { model: this.onsale, where: { id: onsaleId } },
        ],
      });
      return res.json(data);
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
    try {
      const photo = await this.productPhoto.findByPk(photoId);
      const { productId } = photo;
      await this.productPhoto.update(
        { thumbnail: false },
        { where: { productId: productId } }
      );
      await this.productPhoto.update(
        { thumbnail: true },
        { where: { id: photoId } }
      );
      const data = await this.getAdminUpdateProduct(productId);
      return res.json(data);
    } catch (error) {
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
          await newThumbnail.update({ thumbnail: true });
        }
      }
      await target.destroy();
      const data = await this.getAdminUpdateProduct(productId);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = ProductController;
