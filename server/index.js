import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
const app = express();
dotenv.config();
/*
enables the application to parse incoming JSON payloads in the request body.
enables the application to parse incoming URL-encoded payloads in the request body.
line enables Cross-Origin Resource Sharing (CORS) for the application, allowing clients from different origins to make requests to the server.
 */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));
