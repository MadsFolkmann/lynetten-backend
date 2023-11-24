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

export default userRouter;
