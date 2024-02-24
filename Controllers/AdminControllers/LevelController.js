const { Op } = require("sequelize");

class LevelController {
  constructor(db) {
    this.level = db.level;
    this.user = db.user;
  }

  updateUserLevel = async (res) => {
    try {
      const levels = await this.level.findAll({
        attributes: ["id", "requirement"],
        order: [["requirement", "ASC"]],
      });
      await this.user.update(
        { levelId: levels[0].id },
        {
          where: { points: { [Op.between]: [0, levels[0].requirement] } },
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
    try {
      await this.level.destroy({ where: { id: levelId } });
      await this.updateUserLevel(res);
      return res.json("Deleted");
    } catch (error) {
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
    try {
      const data = await this.level.create(newData);
      await this.updateUserLevel(res);
      return res.json(data);
    } catch (error) {
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
    try {
      const data = await this.level.update(newData, {
        where: { id: id },
        returning: true,
      });
      if ("requirement" in newData) {
        this.updateUserLevel(res);
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
