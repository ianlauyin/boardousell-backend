class NoticeController {
  constructor(db) {
    this.notice = db.notice;
  }

  getAllNotices = async (req, res) => {
    try {
      const allNotices = await this.notice.findAll({
        order: [["created_at", "DESC"]],
        attributes: ["id", "title", "created_at"],
      });
      return res.json(allNotices);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getNewestNotices = async (req, res) => {
    try {
      const newestNotices = await this.notice.findAll({
        order: [["created_at", "DESC"]],
        limit: 3,
        attributes: ["id", "title", "url"],
      });
      return res.json(newestNotices);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  getOneNotice = async (req, res) => {
    const { noticeId } = req.params;
    try {
      const noticeDetail = await this.notice.findByPk(noticeId);
      return res.json(noticeDetail);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = NoticeController;
