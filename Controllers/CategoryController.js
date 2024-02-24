class CategoryController {
  constructor(db) {
    this.category = db.category;
  }

  getCategories = async (req, res) => {
    try {
      const data = await this.category.findAll();
      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  };
}

module.exports = CategoryController;
