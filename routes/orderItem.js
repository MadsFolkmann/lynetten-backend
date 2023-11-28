import { Router } from "express";
import dbConnection from "../database.js";

const orderItemRouter = Router();

// Get orderItem
orderItemRouter.get("/", async (request, response) => {
  try {
    const query = "SELECT * FROM orderItems ORDER BY orderItemId;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// Get ordrItem by ID
orderItemRouter.get("/:id", async (request, response) => {
  try {
    const orderItemId = request.params.id;
    const query = /*sql*/ `
        SELECT * FROM orderItems WHERE orderItemId = ?;`;
    const [rows, fields] = await dbConnection.execute(query, [orderItemId]);
    if (rows.length === 0) {
      response.status(404).json({ message: "OrderItem not found" });
    } else {
      response.json(rows[0]);
    }
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

export default orderItemRouter;
