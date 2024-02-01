class MessageController {
  constructor(db) {
    this.message = db.message;
  }

  postMessage = async (req, res) => {
    const { isUserReceived, detail, orderId } = req.body;
    try {
      const newMsg = await this.message.create({
        orderId,
        isUserReceived,
        detail: detail,
      });
      return res.json(newMsg);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = MessageController;
