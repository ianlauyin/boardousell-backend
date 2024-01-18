"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.message, { as: "sender", foreignKey: "senderID" });
      this.hasMany(models.message, {
        as: "receiver",
        foreignKey: "receiverID",
      });
      this.hasMany(models.address);
      this.belongsTo(models.level);
      this.hasMany(models.wishlist);
      this.hasMany(models.review);
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      levelId: {
        type: DataTypes.INTEGER,
        references: { model: "levels", key: "id" },
      },
      points: DataTypes.INTEGER,
      phone: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
