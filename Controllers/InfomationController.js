class InfomationController {
  constructor(db) {
    this.infomation = db.infomation;
  }
  getAllInfo = async (req, res) => {
    try {
      const allInfo = await this.infomation.findAll({
        attributes: ["name", "detail"],
      });
      return res.json(allInfo);
    } catch (error) {
      res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = InfomationController;
