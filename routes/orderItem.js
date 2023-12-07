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

// GET order items for a specific order
orderItemRouter.get("/:orderId/items", async (request, response) => {
   try {
       const orderId = request.params.orderId;
       const { userId } = request.query;

       // Construct the field name based on the presence of userId
       const orderIdField = userId ? "orderId" : "guestOrderId";

       // Fetch order items for the specified orderId
       const getOrderItemsQuery = /*sql*/ `
            SELECT *
            FROM OrderItems
            WHERE ${orderIdField} = ?;
        `;

       const [orderItems] = await dbConnection.execute(getOrderItemsQuery, [orderId]);

       response.status(200).json({ orderItems });
   } catch (error) {
       console.error(error);
       response.status(500).json({ message: "Internal server error" });
   }
});
//how to get order items for a specific order
//  "/orderItem/123/items?userId=456"

// Add items to an order
orderItemRouter.post("/:orderId/items", async (request, response) => {
    try {
        const orderId = request.params.orderId;
        const { orderItems, userId } = request.body;


        // Logic to distinguish between regular orders and guest orders
        const isGuestOrder = !userId; // No userId indicates a guest order

        if (orderItems && orderItems.length > 0) {
            const createOrderItemsQuery = /*sql*/ `
                INSERT INTO OrderItems (${isGuestOrder ? 'guestOrderId' : 'orderId'}, productId, quantity)
                VALUES (?, ?, ?);
            `;

            for (const item of orderItems) {
                const insertId = orderId;
                await dbConnection.execute(createOrderItemsQuery, [insertId, item.productId, item.quantity]);
            }

            // Calculate total amount based on the prices of associated items
            const calculateTotalAmountQuery = /*sql*/ `
                SELECT SUM(
                    CASE
                        WHEN Products.offerPrice IS NOT NULL AND Products.offerPrice < Products.listPrice THEN quantity * Products.offerPrice
                        ELSE quantity * Products.listPrice
                    END
                ) AS totalAmount
                FROM OrderItems
                JOIN Products ON OrderItems.productId = Products.productId
                WHERE ${isGuestOrder ? 'guestOrderId' : 'orderId'} = ?;
            `;

            const [totalAmountResult] = await dbConnection.execute(calculateTotalAmountQuery, [orderId]);
            const totalAmount = totalAmountResult[0].totalAmount;

            // Update total amount in respective orders table
            const updateTotalAmountQuery = /*sql*/ `
                UPDATE ${isGuestOrder ? 'GuestOrders' : 'Orders'}
                SET totalAmount = ?
                WHERE ${isGuestOrder ? 'guestOrderId' : 'orderId'} = ?;
            `;

            await dbConnection.execute(updateTotalAmountQuery, [totalAmount, orderId]);

            response.status(201).json({ message: "Order items added successfully", orderId });
        } else {
            response.status(400).json({ message: "No order items provided" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});

// syntax to add items to an order {
//   "userId": 1, (if guest order, leave out this property)
//   "orderItems": [
//     { "productId": 1, "quantity": 2 },
//     { "productId": 3, "quantity": 1 },
//     { "productId": 5, "quantity": 3 }
//   ]
// }


// Update an order item
orderItemRouter.put("/:orderId/items/:orderItemId", async (request, response) => {
    try {
        const orderId = request.params.orderId;
        const orderItemId = request.params.orderItemId;
        const { productId, quantity, userId } = request.body;

        // Logic to distinguish between regular orders and guest orders
        const orderTable = userId ? "Orders" : "GuestOrders";

        // Check if the order item exists
        const checkOrderItemQuery = /*sql*/ `
      SELECT *
      FROM ${orderTable}
      WHERE orderId = ? AND orderItemId = ?;
    `;

        const [existingOrderItem] = await dbConnection.execute(checkOrderItemQuery, [orderId, orderItemId]);

        if (!existingOrderItem || !existingOrderItem.length) {
            return response.status(404).json({ message: "Order item not found" });
        }

        // Update the order item
        const updateOrderItemQuery = /*sql*/ `
      UPDATE ${orderTable}
      SET productId = ?, quantity = ?
      WHERE orderId = ? AND orderItemId = ?;
    `;

        await dbConnection.execute(updateOrderItemQuery, [productId, quantity, orderId, orderItemId]);

        response.status(200).json({ message: `Order item with ID ${orderItemId} updated successfully` });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});


//---- Syntax to update an order item     { "productId": 31, "quantity": 1 }

// DELETE an order item
orderItemRouter.delete("/:orderId/items/:orderItemId", async (request, response) => {
    try {
        const orderId = request.params.orderId;
        const orderItemId = request.params.orderItemId;
        const { userId } = request.query;

        // Construct the field name based on the presence of userId
        const orderIdField = userId ? "orderId" : "guestOrderId";

        // Fetch the order item to include in the response message
        const getOrderItemQuery = /*sql*/ `
            SELECT *
            FROM OrderItems
            WHERE ${orderIdField} = ? AND orderItemId = ?;
        `;

        const [orderItem] = await dbConnection.execute(getOrderItemQuery, [orderId, orderItemId]);

        if (!orderItem || !orderItem.length) {
            return response.status(404).json({ message: "Order item not found" });
        }

        // Delete the specified order item
        const deleteOrderItemQuery = /*sql*/ `
            DELETE FROM OrderItems
            WHERE ${orderIdField} = ? AND orderItemId = ?;
        `;

        await dbConnection.execute(deleteOrderItemQuery, [orderId, orderItemId]);

        response.status(200).json({ message: `Order item with ID ${orderItemId} deleted successfully` });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});

// DELETE http://your-api-url/:orderId/items/:orderItemId?userId=<userId>


export default orderItemRouter;
