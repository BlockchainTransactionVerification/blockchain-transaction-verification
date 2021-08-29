import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import express from 'express'
import dotenv  from 'dotenv'
import cors from 'cors'

const PORT = process.env.PORT || 5000

//connect database
connectDB()

//dotenv config
dotenv.config()

const app = express()

//Creating API for user
app.use('/api/users', userRoutes)

app.use(cors())



//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))