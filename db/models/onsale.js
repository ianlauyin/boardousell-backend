"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Onsale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.product);
    }
  }
  Onsale.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        references: { model: "products", key: "id" },
      },
      discount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "onsale",
    }
  );
  return Onsale;
};
