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
      SELECT P.*, GROUP_CONCAT(DISTINCT CAT.categoryName) as categories, GROUP_CONCAT(DISTINCT CO.colorName) as colors
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

// Put Products
productRouter.put("/:id", async (request, response) => {
  try {
    const productId = request.params.id;

    // Udtræk opdaterede produktoplysninger fra anmodningens krop
    const { productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity } = request.body;

    // Opdater produktet i Product-tabellen
    const updateProductQuery = /*sql*/ `
      UPDATE Product
      SET productNumber = ?, productName = ?, imageURLs = ?, listPrice = ?, offerPrice = ?, stockQuantity = ?
      WHERE productId = ?;
    `;

    const updateProductValues = [productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, productId];

    await dbConnection.execute(updateProductQuery, updateProductValues);

    response.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default productRouter;
