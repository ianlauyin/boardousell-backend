class NoticeController {
  constructor(db) {
    this.notice = db.notice;
  }

  getNewestNotices = async (req, res) => {
    try {
      const newestNotices = await this.notice.findAll({
        order: [["updated_at", "DESC"]],
        limit: 3,
        attributes: ["id", "title", "url"],
      });
      return res.json(newestNotices);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = NoticeController;
