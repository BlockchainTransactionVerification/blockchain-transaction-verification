import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";
import transactionRoutes from "./routes/transactionRoute.js";
import sopRouter from "./routes/sopRoute.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { verifyUser } from "./controllers/userController.js";

const PORT = process.env.PORT || 3000;

connectDB();

//dotenv config
dotenv.config();

const app = express();
app.use(express.json());
app.options("*", cors());
const __dirname = path.resolve();
//Creating API for user

app.use("/api", userRoutes);
app.use("/apisup", productRoutes);
app.use("/apitra", transactionRoutes);
app.use("/apisop", sopRouter);
/* app.get("*", (req, res) =>
  res.redirect("https://blkchn-trxn-verif.herokuapp.com/")
); */
//app.get("*", (req, res) => res.redirect("http://localhost:3000"));

//for getting heroku to work
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(cors);

//Express js listen method to run project on http://localhost:PORT
app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
