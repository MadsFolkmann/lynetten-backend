import { Router } from "express";
import dbConnection from "../database.js";

const categoryRouter = Router();

// Get Category
categoryRouter.get("/", async (request, response) => {
  try {
    const categoryQuery = /*sql*/ `
      SELECT C.*, GROUP_CONCAT(DISTINCT P.productName) AS products, GROUP_CONCAT(DISTINCT P.productId) AS productIds
      FROM Categories AS C
      LEFT JOIN ProductCategory AS PC ON C.categoryId = PC.categoryId
      LEFT JOIN Products AS P ON PC.productId = P.productId
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
    FROM categories WHERE categoryId=?;`;
  const categoryValues = [categoryId];

  try {
    const [categoryResults] = await dbConnection.execute(categoryQuery, categoryValues);

    if (categoryResults.length === 0) {
      response.status(404).json({ message: "Category not found" });
    } else {
      const productQuery = /*sql*/ `
      SELECT P.*, GROUP_CONCAT(DISTINCT CO.colorName) as colors, GROUP_CONCAT(DISTINCT C.categoryName) as categories
        FROM Products AS P
        LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
        LEFT JOIN Colors AS CO ON P.productId = CO.productId
        LEFT JOIN Categories AS C ON PC.categoryId = C.categoryId

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

// Post (Create) a Category
categoryRouter.post("/", async (request, response) => {
  const { categoryName } = request.body;

  const createCategoryQuery = /*sql*/ `
    INSERT INTO Categories (categoryName)
    VALUES (?);
  `;
  const createCategoryValues = [categoryName];

  try {
    await dbConnection.execute(createCategoryQuery, createCategoryValues);
    response.json({ message: "Category created successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

// PUT (Update) a Category
categoryRouter.put("/:id", async (request, response) => {
  const categoryId = request.params.id;
  const { categoryName } = request.body;

  // Check if the category exists
  const checkCategoryQuery = /*sql*/ `
    SELECT * FROM Categories WHERE categoryId = ?;
  `;
  const [checkCategoryResults] = await dbConnection.execute(checkCategoryQuery, [categoryId]);

  if (checkCategoryResults.length === 0) {
    return response.status(404).json({ message: "Category not found" });
  }

  // Update the category
  const updateCategoryQuery = /*sql*/ `
    UPDATE Categories SET categoryName = ? WHERE categoryId = ?;
  `;
  const updateCategoryValues = [categoryName, categoryId];

  try {
    await dbConnection.execute(updateCategoryQuery, updateCategoryValues);
    response.json({ message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

// DELETE a Category
categoryRouter.delete("/:id", async (request, response) => {
  const categoryId = request.params.id;

  // Check if the category exists
  const checkCategoryQuery = /*sql*/ `
    SELECT * FROM Categories WHERE categoryId = ?;
  `;
  const [checkCategoryResults] = await dbConnection.execute(checkCategoryQuery, [categoryId]);

  if (checkCategoryResults.length === 0) {
    return response.status(404).json({ message: "Category not found" });
  }

  // Delete the category
  const deleteCategoryQuery = /*sql*/ `
    DELETE FROM Categories WHERE categoryId = ?;
  `;
  const deleteCategoryValues = [categoryId];

  try {
    await dbConnection.execute(deleteCategoryQuery, deleteCategoryValues);
    response.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default categoryRouter;
