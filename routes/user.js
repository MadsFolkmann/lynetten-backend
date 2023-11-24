import { Router } from "express";
import dbConnection from "../database.js";

const userRouter = Router();

// Get Products
userRouter.get("/", async (request, response) => {
  try {
    const query = "SELECT * FROM product ORDER BY userId;";
    const [rows, fields] = await dbConnection.execute(query);
    response.json(rows);
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

// GET SPECIFIC USER
userRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const query = /*sql*/ `
    SELECT * 
    FROM user WHERE userId=?;`;
  const values = [id];

  try {
    const [results] = await dbConnection.execute(query, values);
    if (results.length === 0) {
      response.status(404).json({ message: "User not found" });
    } else {
      response.json(results);
    }
  } catch (error) {
    console.log(error);
    response.json({ message: error.message });
  }
});

export default userRouter;
