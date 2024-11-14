import { Server, Socket } from "socket.io";
import { launchMissile } from "../services/attackService";
import { interceptMissile } from "../services/defenseService";

export const initializeSocketServer = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`A client connected`);

    socket.on("join_room", (region: string) => {
      socket.join(region);
      console.log(`joined region ${region}`);
    });

    socket.on("launch-missile", async ({ userId, region, missileName }) => {
        console.log("launch missile");
        console.log(region);
        
        try {
          await launchMissile(io, userId, region, missileName);
        } catch (error:any) {
          socket.emit("error", { message: error.message });
        }
      });

      socket.on("intercept_missile", async ({ userId, region, missileName, interceptorName, remainingTime }) => {
        try {
          await interceptMissile(io, userId, region, missileName, interceptorName, remainingTime);
        } catch (error: any) {
          socket.emit("error", { message: error.message });
        }
      });

    socket.on("leave_room", (region: string) => {
      socket.leave(region);
      console.log(`Client ${socket.id} left region ${region}`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
