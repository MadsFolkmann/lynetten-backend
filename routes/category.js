import { Router } from "express";
import dbConnection from "../database.js";

const categoryRouter = Router();

// Get Category
categoryRouter.get("/", async (request, response) => {
  try {
    const categoryQuery = /*sql*/ `
      SELECT C.*, GROUP_CONCAT(DISTINCT P.productName) AS products, GROUP_CONCAT(DISTINCT CO.colorName) AS colors
      FROM Category AS C
      LEFT JOIN ProductCategory AS PC ON C.categoryId = PC.categoryId
      LEFT JOIN Product AS P ON PC.productId = P.productId
      LEFT JOIN Color AS CO ON P.productId = CO.productId
      GROUP BY C.categoryId
      ORDER BY C.categoryName;`;

    const [categoryResults] = await dbConnection.execute(categoryQuery);

    response.json(categoryResults);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET SPECIFIC CATEGORY
categoryRouter.get("/:id", async (request, response) => {
  const categoryId = request.params.id;
  const categoryQuery = /*sql*/ `
    SELECT * 
    FROM category WHERE categoryId=?;`;
  const categoryValues = [categoryId];

  try {
    const [categoryResults] = await dbConnection.execute(categoryQuery, categoryValues);

    if (categoryResults.length === 0) {
      response.status(404).json({ message: "Category not found" });
    } else {
      const productQuery = /*sql*/ `
        SELECT P.*, GROUP_CONCAT(DISTINCT CO.colorName) as colors
        FROM Product AS P
        LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
        LEFT JOIN Color AS CO ON P.productId = CO.productId
        WHERE PC.categoryId = ?
        GROUP BY P.productId
        ORDER BY P.productName;`;

      const [productResults] = await dbConnection.execute(productQuery, [categoryId]);

      response.json({
        category: {
          ...categoryResults[0],
          colors: productResults[0]?.colors, // Adding colors to the category result
        },
        products: productResults,
      });
    }
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

export default categoryRouter;
