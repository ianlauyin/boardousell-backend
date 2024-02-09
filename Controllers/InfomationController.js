class InfomationController {
  constructor(db) {
    this.infomation = db.infomation;
  }

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

  adminGetAllInfo = async (req, res) => {
    try {
      const allInfo = await this.infomation.findAll();
      return res.json(allInfo);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getAllInfo = async (req, res) => {
    try {
      const allInfo = await this.infomation.findAll({
        attributes: ["name", "detail"],
      });
      return res.json(allInfo);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = InfomationController;
