"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.product);
      this.belongsTo(models.user);
    }
  }
  Review.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        references: { model: "products", key: "id" },
      },
      rating: DataTypes.INTEGER,
      detail: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "review",
      underscored: true,
    }
  );
  return Review;
};
