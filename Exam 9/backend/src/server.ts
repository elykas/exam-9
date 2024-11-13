import  express  from "express";
import dotenv from "dotenv";
import connectDb from "./config/db";
import cors  from "cors"
import routerAuths from "./routes/authRouter";
import http from 'http';
import { Server } from 'socket.io';
import mongoose from "mongoose";
import { initializeSocketServer } from "./sockets/webSocket";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const db= 
connectDb();


app.use(express.json());
app.use(cors());

app.use('/api',routerAuths)

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  initializeSocketServer(io);

  app.use(errorHandler);
app.listen(PORT,()=>{console.log("server is running in port " + PORT);
})