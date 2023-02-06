import { pool } from "../config/database.js";

class Category {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      "error",
      (error, client) => `Error, ${error}, on idle client${client}`,
    );
  }

  async insert(columns, values) {
    const query = `
        INSERT INTO ${this.table}(${columns})
        VALUES (${values})
        RETURNING id, ${columns}
    `;
    return this.pool.query(query);
  }
}

export default Category;
