import exp from "constants";
import { Router } from "express";
import dbConnection from "../database.js";

const orderRouter = Router();

// Get orders
orderRouter.get("/", async (request, response) => {
  try {
    const query = "SELECT * FROM orders ORDER BY orderId;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

export default orderRouter;
