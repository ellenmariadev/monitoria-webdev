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

  async getAll(req, res) {
    try {
      const { rows } = await CategoryModel.select("id, name");
      return res.status(200).send(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const categories = await CategoryModel.selectById(id);
      if (!categories.rows[0]) {
        return res.status(404).send({ error: "Category not found." });
      }
      return res.status(200).send(categories.rows);
    } catch (error) {
      return res.status(500).send({ error: "Internal server error." });
    }
  }
}

export default new CategoryController();
