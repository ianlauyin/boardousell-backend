class UserController {
  constructor(db) {
    this.user = db.user;
    this.level = db.level;
  }

  loginUser = async (req, res) => {
    const { uuid } = req.params;
    try {
      const user = await this.user.findOrCreate({
        where: { uuid: uuid },
      });
      return res.json(user);
    } catch (error) {
      return res.status(400).send({ error: true, msg: error });
    }
  };

  updateUser = async (req, res) => {
    const { userId } = req.params;
    const newData = req.body;
    try {
      const user = await this.user.update(newData, {
        where: { id: userId },
      });
      return res.json(user);
    } catch (error) {
      return res.status(400).send({ error: true, msg: error });
    }
  };

  getUserInfo = async (req, res) => {
    const { userId } = req.params;
    if (isNaN(Number(userId))) {
      return res.status(400).json({ error: true, msg: "Wrong Type of userID" });
    }
    try {
      const userInfo = await this.user.findByPk(userId, {
        attributes: { exclude: ["uuid", "levelId", "isAdmin"] },
        include: this.level,
      });
      return res.json(userInfo);
    } catch (error) {
      return res.status(400).send({ error: true, msg: error });
    }
  };

  adminSearchUser = async (req, res) => {
    try {
      const { query } = req;
      const users = await this.user.findAll({
        where: query,
        attributes: { exclude: ["uuid"] },
      });
      return res.json(users);
    } catch (error) {
      return res.status(400).send({ error: true, msg: error });
    }
  };
}

module.exports = UserController;
