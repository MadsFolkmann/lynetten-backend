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
  const {address, phoneNumber, city, country, zipCode, paid } = request.body; // Opdaterede ejendomsnavne

  // Check if the order exists before attempting to update
  const checkOrderQuery = /*sql*/ `
    SELECT * FROM orders WHERE orderId = ?;
  `;
  const [existingOrder] = await dbConnection.execute(checkOrderQuery, [orderId]);

  if (!existingOrder || existingOrder.length === 0) {
    return response.status(404).json({ message: "Order not found" });
  }

  try {
    // Opdater de relevante felter i ordren
    const updateOrderQuery = /*sql*/ `
      UPDATE orders
      SET address = ?, phoneNumber = ?, country = ?, city = ?, zipCode = ?, paid = ?
      WHERE orderId = ?;
    `;
    const updateOrderValues = [address, phoneNumber, country, city, zipCode, paid, orderId];
    await dbConnection.execute(updateOrderQuery, updateOrderValues);

    response.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

orderRouter.delete("/:id", async (request, response) => {
  const orderId = request.params.id;

  // Check if the order exists before attempting to delete
  const checkOrderQuery = /*sql*/ `
    SELECT * FROM orders WHERE orderId = ?;
  `;
  const [existingOrder] = await dbConnection.execute(checkOrderQuery, [orderId]);

  if (!existingOrder || existingOrder.length === 0) {
    return response.status(404).json({ message: "Order not found" });
  }

  try {
    // Delete order items associated with the order
    const deleteOrderItemsQuery = /*sql*/ `
      DELETE FROM orderitems WHERE orderId = ?;
    `;
    await dbConnection.execute(deleteOrderItemsQuery, [orderId]);

    // Delete the order itself
    const deleteOrderQuery = /*sql*/ `
      DELETE FROM orders WHERE orderId = ?;
    `;
    await dbConnection.execute(deleteOrderQuery, [orderId]);

    response.json({ message: "Order and associated items deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default orderRouter;
