import { Router } from "express";
import dbConnection from "../database.js";

const productRouter = Router();

// GET PRODUCTS and Pagination
productRouter.get("/", async (request, response) => {
  try {
    const pageNum = Number(request.query.pageNum);
    const pageSize = Number(request.query.pageSize);
    const offset = (pageNum - 1) * pageSize;

    if (isNaN(pageNum) || isNaN(pageSize)) {
      const query = /*sql*/ `
        SELECT P.*, GROUP_CONCAT(DISTINCT CAT.categoryName) as categories
        FROM Products AS P
        LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
        LEFT JOIN Categories AS CAT ON PC.categoryId = CAT.categoryId
        GROUP BY P.productId
        ORDER BY P.productName;`;

      const [rows, fields] = await dbConnection.query(query);
      response.json(rows);
    } else {
      const query = /*sql*/ `
        SELECT P.*, GROUP_CONCAT(DISTINCT CAT.categoryName) as categories
        FROM Products AS P
        LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
        LEFT JOIN Categories AS CAT ON PC.categoryId = CAT.categoryId
        GROUP BY P.productId
        ORDER BY P.productName
        LIMIT ? OFFSET ?;`;

      const [rows, fields] = await dbConnection.query(query, [pageSize, offset]);
      response.json(rows);
    }
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
        GROUP_CONCAT(DISTINCT CAT.categoryName) as categories
      FROM Products AS P
      LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
      LEFT JOIN Categories AS CAT ON PC.categoryId = CAT.categoryId
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
      FROM Products AS P
      LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
      LEFT JOIN Categories AS CAT ON PC.categoryId = CAT.categoryId
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

productRouter.post("/", async (request, response) => {
  try {
    const { productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, description, categories } = request.body;

    // Insert the product into the Product table
    const insertProductQuery = /*sql*/ `
      INSERT INTO Products (productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, description)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const insertProductValues = [productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, description];

    const [productResult] = await dbConnection.execute(insertProductQuery, insertProductValues);

    // Insert categories for the product
    const productId = productResult.insertId;

    // Insert categories for the product
    if (categories && categories.length > 0) {
      const categoryIds = categories.split("|").map((category) => parseInt(category)); // Splists categories by pipe and maps them to integers
      for (const categoryId of categoryIds) {
        // Insert the productId and categoryId into ProductCategory table
        const insertCategoryQuery = /*sql*/ `
          INSERT INTO ProductCategory (productId, categoryId) VALUES (?, ?);
        `;
        await dbConnection.execute(insertCategoryQuery, [productId, categoryId]);
      }
    }

    response.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

// Put Products (Samt at kunne ændre på kategori)
productRouter.put("/:id", async (request, response) => {
  try {
    const productId = request.params.id;

    // Extract updated product information from the request body
    const { productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, description, categories } = request.body;

    // Update the product in the Product table
    const updateProductQuery = /*sql*/ `
      UPDATE Products
      SET productNumber = ?, productName = ?, imageURLs = ?, listPrice = ?, offerPrice = ?, stockQuantity = ?, description = ?
      WHERE productId = ?;
    `;

    const updateProductValues = [productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, description, productId];

    await dbConnection.execute(updateProductQuery, updateProductValues);

    // Update categories for the product
    if (categories && categories.length > 0) {
      // Delete existing categories for the product
      const deleteCategoriesQuery = /*sql*/ `
        DELETE FROM ProductCategory WHERE productId = ?;
      `;
      await dbConnection.execute(deleteCategoriesQuery, [productId]);

      const categoryIds = categories.split("|").map((category) => parseInt(category)); // Splists categories by pipe and maps them to integers
      for (const categoryId of categoryIds) {
        // Insert the productId and categoryId into ProductCategory table
        const insertCategoryQuery = /*sql*/ `
          INSERT INTO ProductCategory (productId, categoryId) VALUES (?, ?);
        `;
        await dbConnection.execute(insertCategoryQuery, [productId, categoryId]);
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

    // Delete specific product-category associations
    const deleteCategoriesQuery = /*sql*/ `
      DELETE FROM ProductCategory
      WHERE productId = ?;
    `;
    await dbConnection.execute(deleteCategoriesQuery, [productId]);

    // Delete the product
    const deleteProductQuery = /*sql*/ `
      DELETE FROM Products
      WHERE productId = ?;
    `;
    await dbConnection.execute(deleteProductQuery, [productId]);

    response.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default productRouter;
