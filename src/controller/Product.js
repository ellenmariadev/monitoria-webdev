import Model from "../model/Model";
import { isUnique } from "../validators/unique";

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
}

export default new ProductController();
