import { Router } from "express";
import dbConnection from "../database.js";

const searchRouter = Router();

// Så man ikke behøver skrive ?q= i url'en
searchRouter.get("/:q", async (request, response) => {
  const searchString = request.params.q;
  console.log("Search String:", searchString);

  const productsQuery = /*sql*/ `
      SELECT * FROM Products WHERE productName LIKE ?
      ORDER BY productName`;

  const categoryQuery = /*sql*/ `
      SELECT * FROM Categories WHERE categoryId LIKE ? ORDER BY categoryName`;

  const values = [`%${searchString}%`];

  try {
    const [productsResults, categoriesResults] = await Promise.all([
      dbConnection.execute(productsQuery, values),
      dbConnection.execute(categoryQuery, values),
    ]);

    const results = {
      products: productsResults[0],
      categories: categoriesResults[0],
    };
    response.json(results);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default searchRouter;
