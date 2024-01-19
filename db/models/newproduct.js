"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Newproduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.product);
    }
  }
  Newproduct.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        references: { model: "products", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "new",
      underscored: true,
    }
  );
  return Newproduct;
};
