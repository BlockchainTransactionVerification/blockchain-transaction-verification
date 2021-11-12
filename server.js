import http from "http"
import logger from "morgan"
import socketio from 'socket.io'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import productRoutes from './routes/productRoute.js'
import chatRoomRouter from './routes/chatroom.js'
import sopRouter from "./routes/sopRoute.js";
import indexRouter from './routes/index.js'
import transactionRoutes from './routes/transactionRoute.js'
import Websockets from './utils/WebSockets.js'

import express from 'express'
import dotenv  from 'dotenv'
import cors from 'cors'
import path from 'path'

const app = express();
const PORT = process.env.PORT || 3000;
app.set("PORT", port);


connectDB();

//dotenv config
dotenv.config();

app.use(logger("dev"));
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: false }));
const __dirname = path.resolve();
//Creating API for user

app.use("/api", userRoutes);
app.use("/apisup", productRoutes);
app.use("/apitra", transactionRoutes);
app.use("/room", decode, chatRoomRouter);
app.use("/apisop", sopRouter);
app.use("/apiupload", uploadRouter);
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

/** Create HTTP server. */
const server = http.createServer(app);
/** Create socket connection */
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});