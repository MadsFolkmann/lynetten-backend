import mysql from "mysql2/promise"; // using mysql2 - installed npm library
import "dotenv/config";
import fs from "fs/promises";
import { log } from "console";
import debug from "debug";

const dbBugger = debug("app:database");

const connection = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements: true,
};

const dbConnection = await mysql.createConnection(connection);
dbBugger("Database Connected Succesfully");

export default dbConnection;