class InfomationController {
  constructor(db) {
    this.infomation = db.infomation;
  }

  addInfo = async (req, res) => {
    const newInfo = req.body;
    if (!newInfo) {
      return res
        .status(400)
        .json({ error: true, msg: "Need Data to Add Contact" });
    }
    try {
      const data = await this.infomation.create(newInfo);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  deleteInfo = async (req, res) => {
    const { infoId } = req.params;
    if (isNaN(Number(infoId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong type of Info Id" });
    }
    try {
      await this.infomation.destroy({ where: { id: infoId } });
      return res.json("Deleted");
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = InfomationController;
