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
      this.belongsTo(models.user, { as: "sender", foreignKey: "senderId" });
      this.belongsTo(models.user, { as: "receiver", foreignKey: "receiverId" });
    }
  }
  Message.init(
    {
      senderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      receiverId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      detail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "message",
      underscored: true,
    }
  );
  return Message;
};
