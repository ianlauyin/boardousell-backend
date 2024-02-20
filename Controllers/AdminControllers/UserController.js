class UserController {
  constructor(db) {
    this.user = db.user;
    this.level = db.level;
  }

  updateUserInfo = async (req, res) => {
    const { userId } = req.params;
    const newData = req.body;
    try {
      if ("points" in newData) {
        const levelInfo = await this.level.findAll({
          attributes: ["id", "requirement"],
          order: [["requirement", "DESC"]],
        });
        newData.levelId = 1;
        let prevId = levelInfo[0].id;
        for (const { id, requirement } of levelInfo) {
          if (newData.points >= requirement) {
            newData.levelId = prevId;
            break;
          }
          prevId = id;
        }
      }
      await this.user.update(newData, {
        where: { id: userId },
      });
      return res.json("Update Okay");
    } catch (error) {
      return res.status(400).send({ error: true, msg: error });
    }
  };

  searchUser = async (req, res) => {
    try {
      const { query } = req;
      const users = await this.user.findAll({
        where: query,
        attributes: { exclude: ["uuid"] },
        order: [["updatedAt", "DESC"]],
        include: this.level,
      });
      return res.json(users);
    } catch (error) {
      return res.status(400).send({ error: true, msg: error });
    }
  };
}

module.exports = UserController;
