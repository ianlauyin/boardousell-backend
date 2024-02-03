class UserController {
  constructor(db) {
    this.user = db.user;
    this.level = db.level;
  }

  getUserInfo = async (req, res) => {
    const { userId } = req.params;
    if (isNaN(Number(userId))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of userID" });
    }
    try {
      const userInfo = await this.user.findByPk(userId, {
        attributes: ["email", "points"],
        include: {
          model: this.level,
          attributes: ["discount"],
        },
      });
      return res.json(userInfo);
    } catch (error) {
      return res.status(400).send({ error: true, msg: error });
    }
  };
}

module.exports = UserController;
