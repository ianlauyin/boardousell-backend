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
      this.hasMany(models.productorder);
      this.belongsTo(models.status);
      this.belongsToMany(models.product, { through: models.productorder });
    }
  }
  Order.init(
    {
      addressId: {
        type: DataTypes.INTEGER,
        references: {
          model: "addresses",
          key: "id",
        },
      },
      statusId: {
        type: DataTypes.INTEGER,
        references: {
          model: "statuses",
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
