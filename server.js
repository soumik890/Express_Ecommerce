import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import morgan from "morgan";
import authRote from "./routes/authRoute.js";

dotenv.config();

const app = express();

//Middle ware config
app.use(express.json());
app.use(morgan("dev"));

connectdb();

app.get("/", (req, res) => {
  res.send("Hello World");
});

//all routes
app.use("/api/v1/auth", authRote);

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is live", ${PORT}`.bgMagenta.white);
});
