import { Server, Socket } from "socket.io";

export const initializeSocketServer = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join_room", (region: string) => {
      socket.join(region);
      console.log(`Client ${socket.id} joined region ${region}`);
      socket.to(region).emit("notification", `A new player has joined ${region}`);
    });

    socket.on("launch_missile", ({ region, missileName }) => {
      console.log(`Missile ${missileName} launched to ${region}`);
      io.to(region).emit("missile_launched", { missileName, region });
    });

    socket.on("intercept_missile", ({ region, missileName, success }) => {
      console.log(`Missile ${missileName} interception attempt in ${region}, success: ${success}`);
      io.to(region).emit("interception_result", {
        missileName,
        region,
        result: success ? "Interception successful" : "Defense breached",
      });
    });

    socket.on("leave_room", (region: string) => {
      socket.leave(region);
      console.log(`Client ${socket.id} left region ${region}`);
      socket.to(region).emit("notification", `A player has left ${region}`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
