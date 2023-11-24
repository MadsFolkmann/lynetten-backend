import { Router } from "express";
import dbConnection from "../database.js";

const categoryRouter = Router();

// Get Products
categoryRouter.get("/", async (request, response) => {
  try {
    const query = "SELECT * FROM category ORDER BY categoryName;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

export default categoryRouter;
