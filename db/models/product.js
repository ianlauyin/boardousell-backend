"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.productPhoto);
      this.belongsToMany(models.order, { through: models.productorder });
      this.hasMany(models.productorder);
      this.hasMany(models.wishlist);
      this.hasMany(models.review);
      this.belongsToMany(models.category, { through: "product_categories" });
      this.hasOne(models.newproduct);
      this.hasOne(models.onsale);
      this.hasMany(models.cart);
    }
  }
  Product.init(
    {
      price: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      stocks: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product",
      underscored: true,
    }
  );
  return Product;
};
