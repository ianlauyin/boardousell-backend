"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.order);
      this.belongsTo(models.product);
    }
  }
  ProductOrders.init(
    {
      amount: DataTypes.INTEGER,
      productId: {
        type: DataTypes.INTEGER,
        references: { model: "products", key: "id" },
      },
      orderId: {
        type: DataTypes.INTEGER,
        references: { model: "orders", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "productorder",
      underscored: true,
    }
  );
  return ProductOrders;
};
