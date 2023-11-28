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

orderRouter.get("/:id", async (request, response) => {
  try {
    const orderId = request.params.id;
    const query = /*sql*/ `
            SELECT * FROM orders WHERE orderId = ?;`;
    const [rows, fields] = await dbConnection.execute(query, [orderId]);
    if (rows.length === 0) {
      response.status(404).json({ message: "Order not found" });
    } else {
      response.json(rows[0]);
    }
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

orderRouter.post("/", async (request, response) => {
  const { userId, orderDate, totalPrice } = request.body;

  const createOrderQuery = /*sql*/ `
            INSERT INTO orders (userId, orderDate, totalPrice)
            VALUES (?, ?, ?);
        `;
  const createOrderValues = [userId, orderDate, totalPrice];

  try {
    await dbConnection.execute(createOrderQuery, createOrderValues);
    response.json({ message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default orderRouter;
