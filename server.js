import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import productRoutes from './routes/productRoute.js'
import express from 'express'
import dotenv  from 'dotenv'
import cors from 'cors'
import path from 'path'

const PORT = process.env.PORT || 5000

//connect database
connectDB()

//dotenv config
dotenv.config()

const app = express()
app.use(express.json())

//Creating API for user
app.use('/api', userRoutes)
app.use('/apisup', productRoutes)


app.use(cors())

//for getting heroku to work
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    
    app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))
