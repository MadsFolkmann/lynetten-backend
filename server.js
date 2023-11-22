import express from "express";
import cors from "cors";
import fs from "fs/promises";
import Debug from "debug";


const app = express();
const port = process.env.PORT || 4444;
const debug = Debug("app:startup");

debug("App started successfully😊");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("VELKOMMEN TIL LYNETTENS BACKEND BY AEM🏅🏅🏅");
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});