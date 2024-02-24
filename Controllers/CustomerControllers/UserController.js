class UserController {
  constructor(db) {
    this.user = db.user;
    this.level = db.level;
  }

  getUserInfo = async (req, res) => {
    const { uuid } = req.params;
    try {
      const user = await this.user.findOrCreate({
        where: { uuid: uuid },
        attributes: { exclude: ["uuid", "levelId"] },
        include: this.level,
      });
      return res.json(user);
    } catch (error) {
      return res.status(400).send({ error: true, msg: error });
    }
  };

  updateUserInfo = async (req, res) => {
    const { userId } = req.params;
    const newData = req.body;
    try {
      await this.user.update(newData, {
        where: { id: userId },
      });
      return res.json("Update Okay");
    } catch (error) {
      return res.status(400).send({ error: true, msg: error });
    }
  };
}

module.exports = UserController;
