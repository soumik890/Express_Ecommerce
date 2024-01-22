import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
import authRote from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();

const app = express();

//Middle ware config
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectdb();

app.get("/", (req, res) => {
  res.send("Hello World");
});

//all routes
app.use("/api/v1/auth", authRote);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

let PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is live", ${PORT}`.bgMagenta.white);
});
