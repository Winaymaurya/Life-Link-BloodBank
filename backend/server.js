import express  from "express";

import dotenv from "dotenv";
import mongoose from "mongoose"
import morgan from "morgan";
import cors from "cors";
//Importing routes
import authRoutes from './routes/authRoutes.js'
import bloodRoutes from './routes/bloodRoutes.js'
import historyRoutes from './routes/historyRoutes.js'
import mailRoutes from './routes/mailRoutes.js'
const app=express();
dotenv.config()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


// Connecting database
const db= async()=>{
    try {
        await mongoose.connect(process.env.CLUSTER)
        console.log(`db is connected`);
    } catch (error) {
        console.log(`Error in mongodb${error}`);
    }
}
db();

// Routes--------------------------------


app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/blood',bloodRoutes)
app.use('/api/v1/history',historyRoutes)
app.use('/api/v1/mail',mailRoutes)


app.get("/",(req,res)=>{
    res.send({
        message:"Welcome"
    });
});




// Port
const PORT=process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`) 
})