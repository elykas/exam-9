import { Server, Socket } from "socket.io";

export const initializeSocketServer = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`A client connected: ${socket.id}`);

    socket.on("join_room", (region: string) => {
      socket.join(region);
      console.log(`Client ${socket.id} joined region ${region}`);
    });

    socket.on("launch_missile", ({ region, missileName }) => {
      io.to(region).emit("missile_launched", { missileName, region });
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
