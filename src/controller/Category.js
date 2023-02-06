import Category from "../model/Category";
const CategoryModel = new Category("category");

class CategoryController {
  async create(req, res) {
    const { name } = req.body;
    const columns = "name";
    const values = `'${name}'`;

    try {
      const data = await CategoryModel.insert(columns, values);
      return res.status(200).send(data.rows);
    } catch (error) {
      return res.status(500).send({ error: "Internal server error." });
    }
  }
}

export default new CategoryController();
