import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import postRoutes from "./routes/post.route.js";
import userRoutes from "./routes/user.route.js";
import connectDB from "./DB/db.connect.js";

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(express.static(path.join(__dirname, "/cln/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "cln", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
