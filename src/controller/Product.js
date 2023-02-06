import Model from "../model/Model.js";
import { isUnique } from "../validators/unique.js";

const ProductModel = new Model("product");
const CategoryModel = new Model("category");

class ProductController {
  async create(req, res) {
    const { description, retail_price, wholesale_price } = req.body;
    let { category_id } = req.params;

    const categoriesId = category_id.split("-").map((str) => {
      return Number(str);
    });

    const category = await CategoryModel.selectAllIds(categoriesId);

    const columns = "description, retail_price, wholesale_price, categories";
    const values = `'${description}', '${retail_price}','${wholesale_price}', '${JSON.stringify(
      category.rows,
    )}'`;

    const products = await ProductModel.select(
      "id, description, retail_price, wholesale_price, categories",
    );

    if (!category.rows.length) {
      return res.status(404).send({ error: "Category not found." });
    }

    if (isUnique(products, "description", description)) {
      return res
        .status(409)
        .send({ error: "This product is already registered." });
    }

    try {
      const data = await ProductModel.insert(columns, values);
      return res.status(200).send(data.rows);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error." });
    }
  }

  async getAll(req, res) {
    try {
      const { rows } = await ProductModel.select(
        "id, description, retail_price, wholesale_price, categories",
      );
      return res.status(200).send(rows);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const products = await ProductModel.selectById(id);
      if (!products.rows[0]) {
        return res.status(404).send({ error: "Product not found." });
      }
      return res.status(200).send(products.rows);
    } catch (error) {
      return res.status(500).send({ error: "Internal server error." });
    }
  }

  async alter(req, res) {
    try {
      const { id } = req.params;
      let data = req.body;

      const products = await ProductModel.selectById(id);

      if (!products.rows[0]) {
        return res.status(404).send({ error: "Product not found." });
      }

      const categories = await CategoryModel.select("id, name");
      let categoryObject = categories.rows.map((category) => category);

      const dataCategories = JSON.stringify(data.categories).replace(
        /[[\]]/g,
        "",
      );
      categoryObject = JSON.stringify(categoryObject).replace(/[[\]]/g, "");

      if (!categoryObject.includes(dataCategories)) {
        return res.status(404).send({ error: "This category doesn't exist." });
      }

      data.categories = JSON.stringify(data.categories);
      const productUpdate = await ProductModel.updateProduct(data, id);
      return res.status(200).json(productUpdate.rows);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      const products = await ProductModel.selectById(id);
      if (!products.rows[0]) {
        return res.status(404).send();
      }
      const deleteProduct = await ProductModel.delete(id);
      return res.status(200).send(deleteProduct.rows);
    } catch (error) {
      return res.status(500).send({ error: "Internal server error." });
    }
  }
}

export default new ProductController();
