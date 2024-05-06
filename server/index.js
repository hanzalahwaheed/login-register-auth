import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", authRoutes);

// establish mongoose connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(app.listen(5000, () => console.log("server started")))
  .catch((err) => console.log(err));
