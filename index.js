import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from './config/dbConnect.js';
import courseRoutes from './routes/CourseRoutes.js';
import cartPurchaseRoutes from './routes/CartPurchaseRoutes.js';
import userRoutes from './routes/UserRoutes.js';
// import discussion from './routes/Discussion.js';
// import comment from './routes/Comment.js';
// import { authenticateToken } from './middleware/jwt.js';
dotenv.config();
dbConnect();
// const debug = require('debug')('app')

const app = express()
// require('./db/db')()

process.on('unhandledRejection', (err) => {
  console.log(err, 'Unhandled Rejection at Promise')
  process.exit(1)
})
process.on('uncaughtException', (err) => {
  console.log(err, 'Uncaught Exception thrown')
  process.exit(1)
})

app.use(cors({ origin: '*' }))

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/cartPurchase', cartPurchaseRoutes);
app.use('/api/v1/user', userRoutes);
// app.use('/api/v1/discussions', discussion);
// app.use('/api/v1/comments', comment);

// app.use('/discussion', Discussion)
// app.use('/comment', Comment)
// app.use('/user', UserRoutes)

//listen server
const PORT = process.env.Port || 5000;
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`)); 
