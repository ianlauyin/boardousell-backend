"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.product);
    }
  }
  Cart.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      productId: {
        type: DataTypes.INTEGER,
        references: { model: "products", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "cart",
      underscored: true,
    }
  );
  return Cart;
};
