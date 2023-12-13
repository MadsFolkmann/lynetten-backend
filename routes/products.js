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
        SELECT P.*, GROUP_CONCAT(DISTINCT CAT.categoryName) as categories, GROUP_CONCAT(DISTINCT CO.colorName) as colors
        FROM Products AS P
        LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
        LEFT JOIN Categories AS CAT ON PC.categoryId = CAT.categoryId
        LEFT JOIN Colors AS CO ON P.productId = CO.productId
        GROUP BY P.productId
        ORDER BY P.productName;`;

            const [rows, fields] = await dbConnection.query(query);
            response.json(rows);
        } else {
            const query = /*sql*/ `
        SELECT P.*, GROUP_CONCAT(DISTINCT CAT.categoryName) as categories, GROUP_CONCAT(DISTINCT CO.colorName) as colors
        FROM Products AS P
        LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
        LEFT JOIN Categories AS CAT ON PC.categoryId = CAT.categoryId
        LEFT JOIN Colors AS CO ON P.productId = CO.productId
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
        GROUP_CONCAT(DISTINCT CAT.categoryName) as categories,
        GROUP_CONCAT(DISTINCT CO.colorName) as colors
      FROM Products AS P
      LEFT JOIN ProductCategory AS PC ON P.productId = PC.productId
      LEFT JOIN Categories AS CAT ON PC.categoryId = CAT.categoryId
      LEFT JOIN Colors AS CO ON P.productId = CO.productId
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
    const { productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, description, categories, colors } = request.body;

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
      for (const categoryName of categories) {
        // Get the categoryId based on categoryName
        const getCategoryQuery = /*sql*/ `
      SELECT categoryId FROM Categories WHERE categoryName = ?;
    `;
        const [categoryRows] = await dbConnection.execute(getCategoryQuery, [categoryName]);
        if (categoryRows.length > 0) {
          const categoryId = categoryRows[0].categoryId;

          // Insert the productId and categoryId into ProductCategory table
          const insertCategoryQuery = /*sql*/ `
        INSERT INTO ProductCategory (productId, categoryId) VALUES (?, ?);
      `;
          await dbConnection.execute(insertCategoryQuery, [productId, categoryId]);
        } else {
          // Handle the case where the category doesn't exist
          response.status(400).json({ message: `Category ${categoryName} does not exist` });
          return;
        }
      }
    }

    // Insert colors for the product
    if (colors && colors.length > 0) {
      const insertColorsQuery = /*sql*/ `
        INSERT INTO Colors (productId, colorName) VALUES (?, ?);
      `;
      for (const color of colors) {
        await dbConnection.execute(insertColorsQuery, [productId, color]);
      }
    }

    response.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

// Put Products (Samt at kunne ændre på color og kategori)
productRouter.put("/:id", async (request, response) => {
  try {
    const productId = request.params.id;

    // Extract updated product information from the request body
    const { productNumber, productName, imageURLs, listPrice, offerPrice, stockQuantity, description, categories, colors } = request.body;

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
        DELETE FROM Colors WHERE productId = ?;
      `;
      await dbConnection.execute(deleteColorsQuery, [productId]);

      // Insert new colors for the product
      const insertColorsQuery = /*sql*/ `
        INSERT INTO Colors (productId, colorName) VALUES (?, ?);
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

    // Delete specific product-category associations
    const deleteCategoriesQuery = /*sql*/ `
      DELETE FROM ProductCategory
      WHERE productId = ?;
    `;
    await dbConnection.execute(deleteCategoriesQuery, [productId]);

    // Delete product colors
    const deleteColorsQuery = /*sql*/ `
      DELETE FROM Colors
      WHERE productId = ?;
    `;
    await dbConnection.execute(deleteColorsQuery, [productId]);

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
