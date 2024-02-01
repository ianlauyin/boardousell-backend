"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.productorder);
      this.belongsToMany(models.product, { through: models.productorder });
      this.belongsTo(models.user);
      this.hasMany(models.message);
    }
  }
  Order.init(
    {
      address: DataTypes.TEXT,
      amount: DataTypes.FLOAT,
      status: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "order",
      underscored: true,
    }
  );
  return Order;
};
