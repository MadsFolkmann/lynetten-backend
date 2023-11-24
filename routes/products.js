import { Router } from "express";
import dbConnection from "../database.js";

const productRouter = Router();

// Get Products
productRouter.get("/", async (request, response) => {
  try {
    const query = "SELECT * FROM product ORDER BY productName;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

export default productRouter;
