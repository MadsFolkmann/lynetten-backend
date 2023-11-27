import { Router } from "express";
import dbConnection from "../database.js";

const userRouter = Router();

// Get Users
userRouter.get("/", async (request, response) => {
  try {
    const query = "SELECT * FROM users ORDER BY userId;";
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
    FROM users WHERE userId=?;`;
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

// Post (Create) User
userRouter.post("/", async (request, response) => {
  const { email, password, newsletterSubscription } = request.body;

  const createUserQuery = /*sql*/ `
    INSERT INTO users (email, password, newsletterSubscription)
    VALUES (?, ?, ?);
  `;
  const createUserValues = [email, password, newsletterSubscription];

  try {
    await dbConnection.execute(createUserQuery, createUserValues);
    response.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

// PUT (Update) User
userRouter.put("/:id", async (request, response) => {
  const userId = request.params.id;
  const { email, password, newsletterSubscription } = request.body;

  const updateUserQuery = /*sql*/ `
    UPDATE users
    SET email = ?, password = ?, newsletterSubscription = ?
    WHERE userId = ?;
  `;
  const updateUserValues = [email, password, newsletterSubscription, userId];

  try {
    await dbConnection.execute(updateUserQuery, updateUserValues);
    response.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

// DELETE User
userRouter.delete("/:id", async (request, response) => {
  const userId = request.params.id;

  const deleteUserQuery = /*sql*/ `
    DELETE FROM users
    WHERE userId = ?;
  `;
  const deleteUserValues = [userId];

  try {
    await dbConnection.execute(deleteUserQuery, deleteUserValues);
    response.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default userRouter;
