import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL || "");  //|| "" fallback(empty string) if MONGO_URL is missing, so code wont crash at runtime but it will throw an error 
        console.log("mongoDB connected");//redas the MongoDB connection string (URL) from our .env file 
    } catch (error){
        console.error("mongoDB connection failed:",error)
        process.exit(1);//doesnt keep running without a db 
    }
}