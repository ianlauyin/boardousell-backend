"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.product);
    }
  }
  ProductPhoto.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "productPhoto",
      tableName: "product_photos",
      underscored: true,
    }
  );
  return ProductPhoto;
};
