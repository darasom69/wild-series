import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
async read(id: number) {
  // Execute the SQL SELECT query to retrieve a specific category by its ID
  const [rows] = await databaseClient.query<Rows>(
      `
      select
        category.*,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", program.id, "title", program.title
          )
        ) as programs
      from
        category
        left join program on program.category_id = category.id
      where
        category.id = ?
      group by
        category.id
      `,
    [id],
  );

  // Return the first row of the result, which represents the category
  return rows[0] as Category;
}
async create(category: Omit<Category, "id">) {
  // Execute the SQL INSERT query to add a new category to the "category" table
  const [result] = await databaseClient.query<Result>(
    "insert into category (name) values (?)",
    [category.name],
  );

  // Return the ID of the newly inserted item
  return result.insertId;
}
async delete(id: number) {
  // Execute the SQL DELETE query to delete an existing category from the "category" table
  const [result] = await databaseClient.query<Result>(
    "delete from category where id = ?",
    [id],
  );

  // Return how many rows were affected
  return result.affectedRows;
}
}

export default new CategoryRepository();
