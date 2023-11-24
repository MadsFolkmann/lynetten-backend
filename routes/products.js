import { Router } from "express";
import dbConnection from "../database.js";

const productRouter = Router();

// GET PRODUCTS
productRouter.get("/", async (request, response) => {
  try {
    const query = /*sql*/ `
      SELECT P.*, GROUP_CONCAT(DISTINCT CAT.categoryName) as categories, GROUP_CONCAT(DISTINCT CO.colorName) as colors
      FROM Product AS P
      LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
      LEFT JOIN Category AS CAT ON PC.categoryId = CAT.categoryId
      LEFT JOIN Color AS CO ON P.productId = CO.productId
      GROUP BY P.productId
      ORDER BY P.productName;`;

    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET SPECIFIC PRODUCT BY ID
productRouter.get("/:id", async (request, response) => {
  try {
    const productId = request.params.id;
    const query = /*sql*/ `
      SELECT
        P.*,
        GROUP_CONCAT(DISTINCT CAT.categoryName) as categories,
        GROUP_CONCAT(DISTINCT CO.colorName) as colors
      FROM Product AS P
      LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
      LEFT JOIN Category AS CAT ON PC.categoryId = CAT.categoryId
      LEFT JOIN Color AS CO ON P.productId = CO.productId
      WHERE P.productId = ?
      GROUP BY P.productId;`;

    const [rows, fields] = await dbConnection.execute(query, [productId]);

    if (rows.length === 0) {
      response.status(404).json({ message: "Product not found" });
    } else {
      response.json(rows[0]);
    }
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// Get Specific Product Category by ID
productRouter.get("/:id/category", async (request, response) => {
  try {
    const productId = request.params.id;
    const query = /*sql*/ `
      SELECT GROUP_CONCAT(DISTINCT CAT.categoryName) as categories
      FROM Product AS P
      LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
      LEFT JOIN Category AS CAT ON PC.categoryId = CAT.categoryId
      WHERE P.productId = ?
      GROUP BY P.productId;`;

    const [rows, fields] = await dbConnection.execute(query, [productId]);

    if (rows.length === 0) {
      response.status(404).json({ message: "Product not found" });
    } else {
      response.json({ categories: rows[0].categories });
    }
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// Put Products (Samt at kunne ændre på color og kategori)
productRouter.put("/:id", async (request, response) => {
  try {
    const productId = request.params.id;

    // Extract updated product information from the request body
    const { productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, categories, colors } = request.body;

    // Update the product in the Product table
    const updateProductQuery = /*sql*/ `
      UPDATE Product
      SET productNumber = ?, productName = ?, imageURLs = ?, listPrice = ?, offerPrice = ?, stockQuantity = ?
      WHERE productId = ?;
    `;

    const updateProductValues = [productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, productId];

    await dbConnection.execute(updateProductQuery, updateProductValues);

    // Update categories for the product
    if (categories && categories.length > 0) {
      // Delete existing categories for the product
      const deleteCategoriesQuery = /*sql*/ `
        DELETE FROM ProductCategory WHERE productId = ?;
      `;
      await dbConnection.execute(deleteCategoriesQuery, [productId]);

      // Insert new categories for the product
      const insertCategoriesQuery = /*sql*/ `
        INSERT INTO ProductCategory (productId, categoryId) VALUES (?, ?);
      `;
      for (const category of categories) {
        await dbConnection.execute(insertCategoriesQuery, [productId, category]);
      }
    }

    // Update colors for the product
    if (colors && colors.length > 0) {
      // Delete existing colors for the product
      const deleteColorsQuery = /*sql*/ `
        DELETE FROM Color WHERE productId = ?;
      `;
      await dbConnection.execute(deleteColorsQuery, [productId]);

      // Insert new colors for the product
      const insertColorsQuery = /*sql*/ `
        INSERT INTO Color (productId, colorName) VALUES (?, ?);
      `;
      for (const color of colors) {
        await dbConnection.execute(insertColorsQuery, [productId, color]);
      }
    }

    response.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

// Delete Products
productRouter.delete("/:id", async (request, response) => {
  try {
    const productId = request.params.id;
    const { categoryIdsToDelete } = request.body;

    // Delete specific product-category associations
    const deleteCategoriesQuery = /*sql*/ `
      DELETE FROM ProductCategory
      WHERE productId = ? AND categoryId IN (?);
    `;
    await dbConnection.execute(deleteCategoriesQuery, [productId, categoryIdsToDelete]);

    // Delete product colors
    const deleteColorsQuery = /*sql*/ `
      DELETE FROM Color
      WHERE productId = ?;
    `;
    await dbConnection.execute(deleteColorsQuery, [productId]);

    // Delete the product if no categories are left for the product
    const remainingCategoriesQuery = /*sql*/ `
      SELECT COUNT(*) AS count FROM ProductCategory WHERE productId = ?;
    `;
    const [result] = await dbConnection.execute(remainingCategoriesQuery, [productId]);

    if (result[0].count === 0) {
      const deleteProductQuery = /*sql*/ `
        DELETE FROM Product
        WHERE productId = ?;
      `;
      await dbConnection.execute(deleteProductQuery, [productId]);
    }

    response.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default productRouter;
