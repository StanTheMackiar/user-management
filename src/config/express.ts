import express from "express";
import userRouter from "../routes/user.routes";

const expressApp = express();

// Middlewares
expressApp.use(express.json());

// Routes
expressApp.use('/user', userRouter)

export default expressApp;