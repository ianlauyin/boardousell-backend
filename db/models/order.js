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
      this.belongsTo(models.address);
      this.belongsTo(models.product);
      this.belongsTo(models.user, { as: "buyer", foreignKey: "buyerId" });
    }
  }
  Order.init(
    {
      addressId: {
        type: DataTypes.STRING,
        references: {
          model: "addresses",
          key: "id",
        },
      },
      status: DataTypes.STRING,
      buyerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },

      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "order",
      underscored: true,
    }
  );
  return Order;
};
