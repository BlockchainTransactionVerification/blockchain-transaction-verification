import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoute.js";
import transactionRoutes from "./routes/transactionRoute.js";
import sopRouter from "./routes/sopRoute.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

const PORT = process.env.PORT || 3000;

connectDB();

//dotenv config
dotenv.config();

//for getting heroku to work
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const app = express();
app.use(express.json());

app.options("*", cors());

//Creating API for user
app.use("/api", userRoutes);
app.use("/apisup", productRoutes);
app.use("/apitra", transactionRoutes);
app.use("/apisop", sopRouter);

app.use(cors);

//Express js listen method to run project on http://localhost:PORT
app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
