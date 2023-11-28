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
  const { userId, orderDate, totalAmount } = request.body; // Updated property name
  console.log(userId, orderDate, totalAmount);
  const createOrderQuery = /*sql*/ `
            INSERT INTO orders (userId, orderDate )
            VALUES (?, ?);
        `;
  const createOrderValues = [userId, orderDate]; // Updated property name

  try {
    await dbConnection.execute(createOrderQuery, createOrderValues);
    response.json({ message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

orderRouter.put("/:id", async (request, response) => {
  const orderId = request.params.id;
  const { userId, orderDate, totalAmount } = request.body; // Updated property name

  const updateOrderQuery = /*sql*/ `
                UPDATE orders
                SET userId = ?, orderDate = ?
                WHERE orderId = ?;
            `;
  const updateOrderValues = [userId, orderDate, orderId]; // Updated property name

  try {
    await dbConnection.execute(updateOrderQuery, updateOrderValues);
    response.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

orderRouter.delete("/:id", async (request, response) => {
  const orderId = request.params.id;
  const deleteOrderQuery = /*sql*/ `
                DELETE FROM orders WHERE orderId = ?;
            `;
  const deleteOrderValues = [orderId];

  try {
    await dbConnection.execute(deleteOrderQuery, deleteOrderValues);
    response.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default orderRouter;
