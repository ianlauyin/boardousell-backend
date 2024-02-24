class NoticeController {
  constructor(db) {
    this.notice = db.notice;
  }

  getNotices = async (req, res) => {
    const { limit } = req.query;
    if (!!limit && isNaN(Number(limit))) {
      return res.status(400).json({ error: true, msg: "Wrong type of limit" });
    }
    try {
      const notices = await this.notice.findAll({
        order: [["created_at", "DESC"]],
        limit: limit ? limit : null,
        attributes: ["id", "title", "url"],
      });
      return res.json(notices);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = NoticeController;
