const { Op } = require("sequelize");

class LevelController {
  constructor(db) {
    this.level = db.level;
    this.user = db.user;
  }
  updateUserLevel = async () => {
    const levels = await this.level.findAll({
      attributes: ["id", "requirement"],
      order: [["requirement", "ASC"]],
    });
    await this.user.update(
      { levelId: levels[0].id },
      {
        where: { points: { [Op.between]: [0, levels[1].requirement] } },
      }
    );
    for (let i = 1; i < levels.length; i++) {
      await this.user.update(
        { levelId: levels[i].id },
        {
          where: {
            points: {
              [Op.between]: [levels[i - 1].requirement, levels[i].requirement],
            },
          },
        }
      );
    }
  };
  postNewLevel = async (req, res) => {
    const newData = req.body;
    try {
      await this.level.create(newData);
      this.updateUserLevel();
      const data = await this.level.findAll({
        order: [["requirement", "ASC"]],
      });
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateLevelInfo = async (req, res) => {
    const { id, ...newData } = req.body;
    try {
      await this.level.update(newData, { where: { id: id } });
      if ("requirement" in newData) {
        this.updateUserLevel();
      }
      const data = await this.level.findAll({
        order: [["requirement", "ASC"]],
      });
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getAllLevel = async (req, res) => {
    try {
      const data = await this.level.findAll({
        order: [["requirement", "ASC"]],
      });
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = LevelController;
