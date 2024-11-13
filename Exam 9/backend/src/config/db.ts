import mongoose from "mongoose";

const connectDb = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI!)
        console.log(`Connected to MongoDB at host: ${connect.connection.host}, database: ${connect.connection.name}`);
        
    } catch (error) {
        console.error(error);
    }
}
export default connectDb;