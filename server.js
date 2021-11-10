import http from "http"
import logger from "morgan"
import socketio from 'socket.io'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import productRoutes from './routes/productRoute.js'
import chatRoomRouter from './routes/chatroom.js'
import indexRouter from './routes/index.js'
import transactionRoutes from './routes/transactionRoute.js'
import Websockets from './utils/WebSockets.js'

import express from 'express'
import dotenv  from 'dotenv'
import cors from 'cors'
import path from 'path'


const app = express();
const PORT = process.env.PORT || "5000";
app.set("PORT", port);

//connect database
connectDB()

//dotenv config
dotenv.config()


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Creating API for user
//app.options('*', cors()) // include before other routes
app.use('/api', userRoutes);
app.use('/apisup', productRoutes);
app.use("/", indexRouter);
app.use("/room", chatRoomRouter);
app.use('/apitra', transactionRoutes);


app.use(cors())

//for getting heroku to work
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    
    app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


//Express js listen method to run project on http://localhost:5000
    //app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))

//this should accomplish the same thing as above but also add the websockets

/* Create HTTP server. */
const server = http.createServer(app);
/* Create socket connection */
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)
/* Listen on provided port, on all network interfaces. */
server.listen(PORT);
/* Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});
