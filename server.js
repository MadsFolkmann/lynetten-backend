import express from "express";
import cors from "cors";
import Debug from "debug";
import dbConnection from "./database.js";
import bcrypt from "bcrypt"; // Import bcrypt if you're using it for password hashing
import productRouter from "./routes/products.js";
import categoryRouter from "./routes/category.js";
import userRouter from "./routes/user.js";
import orderItemRouter from "./routes/orderItem.js";
import orderRouter from "./routes/orders.js";
import guestOrderRouter from "./routes/guestOrders.js";
import searchRouter from "./routes/search.js";

const app = express();
const port = process.env.PORT || 4444;
const debug = Debug("app:startup");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("VELKOMMEN TIL LYNETTENS BACKEND BY AEM🏅🏅🏅");
});

// Add the login route here
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Replace the following query with the actual query to your database
        const query = "SELECT * FROM Users WHERE username = ?";
        const [users] = await dbConnection.execute(query, [username]);

        const user = users[0];
        if (user && bcrypt.compareSync(password, user.password)) {
            // Check if user is admin
            if (user.isAdmin) {
                res.json({ success: true, isAdmin: true });
            } else {
                res.json({ success: true, isAdmin: false });
            }
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Use the existing routers
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/orderItems", orderItemRouter);
app.use("/orders", orderRouter);
app.use("/guestOrders", guestOrderRouter);
app.use("/search", searchRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
