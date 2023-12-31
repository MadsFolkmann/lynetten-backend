import { Router } from "express";
import dbConnection from "../database.js";

const guestOrderRouter = Router();

//get guest orders
guestOrderRouter.get("/", async (request, response) => {
    try {
        const query = "SELECT * FROM GuestOrders ORDER BY guestOrderId;";
        const [rows, fields] = await dbConnection.execute(query);
        response.json(rows);
    } catch (error) {
        console.log(error);
        response.json({ message: error.message });
    }
});

//get guest order by id
guestOrderRouter.get("/:id", async (request, response) => {
    try {
        const guestOrderId = request.params.id;
        const query = /*sql*/ `
      SELECT * FROM GuestOrders WHERE guestOrderId = ?;`;
        const [rows, fields] = await dbConnection.execute(query, [guestOrderId]);
        if (rows.length === 0) {
            response.status(404).json({ message: "Guest order not found" });
        } else {
            response.json(rows[0]);
        }
    } catch (error) {
        console.log(error);
        response.json({ message: error.message });
    }
});

guestOrderRouter.post("/", async (request, response) => {
try {
    const { orderDate } = request.body;
    const temporaryUserId = generateTemporaryUserId();

    const createGuestOrderQuery = /*sql*/ `
      INSERT INTO GuestOrders (temporaryUserId, orderDate)
      VALUES (?, ?);
    `;
    const [orderResult] = await dbConnection.execute(createGuestOrderQuery, [temporaryUserId, orderDate]);

    const guestOrderId = orderResult.insertId;

    response.status(201).json({ message: "Guest order created successfully", guestOrderId });
} catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
}
});

function generateTemporaryUserId() {
 const randomId = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
 const temporaryUserId = `temp_${randomId}`; // Create a string using the random number (prefixing with 'temp_')
 return temporaryUserId;
}

//Update guest order
guestOrderRouter.put("/:id", async (request, response) => {
    try {
        const guestOrderId = request.params.id;
        // console.log(guestOrderId);
        const { fullName, email, address, phoneNumber, city, country, zipCode, paid } = request.body;
        // console.log(guestOrderId, fullName, email, address, phoneNumber, city, zipCode);
        const updateGuestOrderQuery = /*sql*/ `
      UPDATE GuestOrders
      SET fullName = ?, email = ?, address = ?, phoneNumber = ?, country = ?, city = ?, zipCode = ?, paid = ?
      WHERE guestOrderId = ?;
    `;

        await dbConnection.execute(updateGuestOrderQuery, [fullName, email, address, phoneNumber, country, city, zipCode, paid, guestOrderId]);

        response.json({ message: "Guest order updated successfully" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});

//Delete guest order
guestOrderRouter.delete("/:id", async (request, response) => {
    try {
        const guestOrderId = request.params.id;

        const deleteGuestOrderQuery = /*sql*/ `
      DELETE FROM GuestOrders
      WHERE guestOrderId = ?;
    `;

        await dbConnection.execute(deleteGuestOrderQuery, [guestOrderId]);

        response.json({ message: "Guest order deleted successfully" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal server error" });
    }
});

// Backend route to delete all unpaid guest orders
guestOrderRouter.delete("/unpaid", async (request, response) => {
  try {
    const deleteUnpaidOrdersQuery = /*sql*/ `
      DELETE FROM GuestOrders
      WHERE paid = false; 
    `;
    await dbConnection.execute(deleteUnpaidOrdersQuery);

    response.json({ message: "Unpaid guest orders deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});


export default guestOrderRouter;