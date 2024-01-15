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
      this.hasMany(models.order);
      this.hasMany(models.wishlist);
      this.hasMany(models.review);
      this.belongsToMany(models.category, { through: "product_categories" });
    }
  }
  Product.init(
    {
      price: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
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
