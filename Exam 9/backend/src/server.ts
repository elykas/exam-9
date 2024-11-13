import  express,{Request,Response}  from "express";
import dotenv from "dotenv";
import connectDb from "./config/db";
import cookieParser from "cookie-parser";
import cors  from "cors"
import routerAuths from "./routes/auth";
import http from 'http';
import { Server } from 'socket.io';
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const db= 
connectDb();


app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api',routerAuths)

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173/candidates/socket", // Change this to your frontend URL
      methods: ["GET", "POST"]
    }
  });


server.listen(PORT,()=>{console.log("server is running in port " + PORT);
})