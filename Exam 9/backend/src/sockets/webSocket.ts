import { Server, Socket } from "socket.io";
import { launchMissile } from "../services/attackService";

export const initializeSocketServer = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`A client connected: ${socket.id}`);

    socket.on("join_room", (region: string) => {
      socket.join(region);
      console.log(`Client ${socket.id} joined region ${region}`);
    });

    socket.on("launch_missile", async ({ userId, region, missileName }) => {
        try {
          await launchMissile(io, userId, region, missileName);
        } catch (error:any) {
          socket.emit("error", { message: error.message });
        }
      });

      socket.on("intercept_missile", ({ region, missileName, success }) => {
        io.to(region).emit("interception_result", {
          missileName,
          region,
          result: success ? "success" : "Defense",
        });
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
