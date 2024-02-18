class MessageController {
  constructor(db) {
    this.message = db.message;
  }

  postMessage = async (req, res) => {
    const { isUserReceiver, detail, orderId } = req.body;
    if (isNaN(Number(orderId)) || typeof isUserReceiver !== "boolean") {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of OrderID/Receiver/Sender" });
    }
    try {
      const newMsg = await this.message.create({
        orderId: orderId,
        isUserReceiver: isUserReceiver,
        detail: detail,
      });
      return res.json(newMsg);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = MessageController;
