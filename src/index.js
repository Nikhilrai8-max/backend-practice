import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { DB_NAME } from "./constants.js";
import app from "./app.js";


dotenv.config();
connectDB();
.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})
.catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
});