import dotwnv from 'dotenv'
dotwnv.config()
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import UserRouter from './routes/UserRoute'
import LeaveRouter from './routes/LeaveRoute'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/user", UserRouter)
app.use("/api/leave", LeaveRouter)

const port = process.env.PORT || 3000


const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName:"Collage-Leaving-Portal"
        })
        console.log("Db Connected")
    } catch (error: any) {
        console.log(error.message)
    }
}

app.listen(port, () => {
    connectDB()
    console.log(`Server running on port ${port}`)
})