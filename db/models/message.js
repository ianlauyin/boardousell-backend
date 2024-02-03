"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.order);
    }
  }
  Message.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        references: { model: "orders", key: "id" },
      },
      isUserReceived: DataTypes.BOOLEAN,
      detail: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "message",
      underscored: true,
    }
  );
  return Message;
};
