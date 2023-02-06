import Model from "../model/Model";
import { isUnique } from "../validators/unique";

const CategoryModel = new Model("category");

class CategoryController {
  async create(req, res) {
    const { name } = req.body;
    const columns = "name";
    const values = `'${name}'`;

    const categories = await CategoryModel.select("id, name");

    if (isUnique(categories, "name", name)) {
      return res
        .status(409)
        .send({ error: "This category is already registered." });
    }

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

  async alter(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const categories = await CategoryModel.selectById(id);

      if (!categories.rows[0]) {
        return res.status(404).send({ error: "Category not found." });
      }

      if (isUnique(categories, "name", data.name)) {
        return res
          .status(409)
          .send({ error: "This category is already registered." });
      }

      const categoryUpdate = await CategoryModel.updateCategory(data, id);
      return res.status(200).json(categoryUpdate.rows);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      const categories = await CategoryModel.selectById(id);
      if (!categories.rows[0]) {
        return res.status(404).send({ error: "Category not found." });
      }
      const deleteCategory = await CategoryModel.delete(id);
      return res.status(200).send(deleteCategory.rows);
    } catch (err) {
      return res.status(500).send({ error: "Internal server error." });
    }
  }
}

export default new CategoryController();
