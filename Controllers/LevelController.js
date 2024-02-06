class LevelController {
  constructor(db) {
    this.level = db.level;
  }
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
