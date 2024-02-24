class NoticeController {
  constructor(db) {
    this.notice = db.notice;
  }

  addNotice = async (req, res) => {
    const newInfo = req.body;
    try {
      const data = await this.notice.create(newInfo);
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  changePhoto = async (req, res) => {
    const { noticeId, url } = req.body;
    if (isNaN(Number(noticeId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of noticeId" });
    }
    try {
      const data = await this.notice.update(
        { url: url },
        { where: { id: noticeId }, returning: true }
      );
      return res.json(data[1][0]);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  updateNotice = async (req, res) => {
    const { noticeId, ...newInfo } = req.body;
    if (isNaN(Number(noticeId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of noticeId" });
    }
    try {
      const data = await this.notice.update(newInfo, {
        where: { id: noticeId },
        returning: true,
      });
      return res.json(data[1][0]);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };

  deleteNotice = async (req, res) => {
    const { noticeId } = req.params;
    if (isNaN(Number(noticeId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of noticeId" });
    }
    try {
      await this.notice.destroy({ where: { id: noticeId } });
      return res.json("Deleted");
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = NoticeController;
