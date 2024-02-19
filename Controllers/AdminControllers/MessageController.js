class MessageController {
  constructor(db) {
    this.message = db.message;
  }

  postMessage = async (req, res) => {
    const { detail, orderId } = req.body;
    if (isNaN(Number(orderId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of OrderID" });
    }
    try {
      const newMsg = await this.message.create({
        orderId: orderId,
        isUserReceiver: true,
        detail: detail,
      });
      return res.json(newMsg);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = MessageController;
