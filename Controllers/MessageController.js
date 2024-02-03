class MessageController {
  constructor(db) {
    this.message = db.message;
  }

  postMessage = async (req, res) => {
    const { isUserReceived, detail, orderId } = req.body;
    console.log(req.body);
    if (isNaN(Number(orderId)) || typeof isUserReceived !== "boolean") {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of OrderID/Receiver/Sender" });
    }
    try {
      const newMsg = await this.message.create({
        orderId: orderId,
        isUserReceived: isUserReceived,
        detail: detail,
      });
      return res.json(newMsg);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = MessageController;
