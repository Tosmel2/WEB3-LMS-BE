import express from "express";
import dotenv from "dotenv";
import { dbConnect } from './config/dbConnect.js';
import courseRoutes from './routes/CourseRoutes.js';
import cartPurchaseRoutes from './routes/CartPurchaseRoutes.js';
dotenv.config();
dbConnect();


const app = express();

//middleware
app.use(express.json());


//routes
app.use("/api/v1/courses", courseRoutes);

app.use("/api/v1/cartPurchase", cartPurchaseRoutes);




//error handlers

//listen server
const PORT = process.env.Port || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`)); 