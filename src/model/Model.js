import { pool } from "../config/database.js";

class Model {
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

  async select(columns) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    return this.pool.query(query);
  }

  async selectById(id) {
    const query = `SELECT * FROM ${this.table} WHERE id = $1`;
    return this.pool.query(query, [id]);
  }

  async selectAllIds(...id) {
    const query = `SELECT * FROM ${this.table} WHERE id = ANY ($1)`;
    return this.pool.query(query, [...id]);
  }

  async updateCategory(data, id) {
    const query = `
        UPDATE ${this.table} SET name = $1 WHERE id = $2 RETURNING *`;
    return this.pool.query(query, [data.name, id]);
  }

  async delete(id) {
    const query = `DELETE FROM ${this.table} WHERE id = $1 RETURNING *`;
    return this.pool.query(query, [id]);
  }
}

export default Model;
