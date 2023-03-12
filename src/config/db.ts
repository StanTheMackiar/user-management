import mongoose from "mongoose";

const connectDB = (url: string) => mongoose.connect(url).then(() => console.log('Database connected'));


export default connectDB;