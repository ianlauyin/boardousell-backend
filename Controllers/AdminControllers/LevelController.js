const { Op } = require("sequelize");

class LevelController {
  constructor(db) {
    this.level = db.level;
    this.user = db.user;
    this.sequelize = db.sequelize;
  }

  updateUserLevel = async (res, t) => {
    try {
      const levels = await this.level.findAll({
        attributes: ["id", "requirement"],
        order: [["requirement", "ASC"]],
      });
      await this.user.update(
        { levelId: levels[0].id },
        {
          where: { points: { [Op.between]: [0, levels[0].requirement] } },
          transaction: t,
        }
      );
      for (let i = 1; i < levels.length; i++) {
        await this.user.update(
          { levelId: levels[i].id },
          {
            where: {
              points: {
                [Op.between]: [
                  levels[i - 1].requirement,
                  levels[i].requirement,
                ],
              },
            },
            transaction: t,
          }
        );
      }
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  deleteLevel = async (req, res) => {
    const { levelId } = req.params;
    if (isNaN(Number(levelId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of levelID" });
    }
    const t = this.sequelize.transaction();
    try {
      await this.level.destroy({ where: { id: levelId }, transaction: t });
      await this.updateUserLevel(res, t);
      await t.commit();
      return res.json("Deleted");
    } catch (error) {
      await t.rollback();
      return res.status(400).json({ error: true, msg: error });
    }
  };

  addNewLevel = async (req, res) => {
    const newData = req.body;
    if (!newData.requirement || isNaN(Number(newData.requirement))) {
      return res
        .status(400)
        .json({ error: true, msg: "Must have requierment" });
    }
    if (!newData.requirement || isNaN(Number(newData.requirement))) {
      return res.status(400).json({ error: true, msg: "Must have discount" });
    }
    if (!newData.title) {
      return res.status(400).json({ error: true, msg: "Must have title" });
    }
    const t = this.sequelize.transaction();
    try {
      const data = await this.level.create(newData, { transaction: t });
      await this.updateUserLevel(res, t);
      await t.commit();
      return res.json(data);
    } catch (error) {
      await t.rollback();
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateLevelInfo = async (req, res) => {
    const { id, ...newData } = req.body;
    if (isNaN(Number(id))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of levelID" });
    }
    const t = this.sequelize.transaction();
    try {
      const data = await this.level.update(newData, {
        where: { id: id },
        transaction: t,
        returning: true,
      });
      if ("requirement" in newData) {
        this.updateUserLevel(res, t);
      }
      return res.json(data[1][0]);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getAllLevel = async (req, res) => {
    try {
      const data = await this.level.findAll();
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = LevelController;
