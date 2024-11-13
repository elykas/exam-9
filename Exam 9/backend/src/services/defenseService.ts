import { Server } from "socket.io";
import { getMissileCount, updateMissileCount } from "../utils/missileUtils";

export const interceptMissile = async (
    io: Server,
    userId: string,
    region: string,
    missileName: string,
    interceptorName: string
  ) => {
    const missileCount = await getMissileCount(userId, interceptorName);
  
    if (missileCount <= 0) {
      throw new Error(`No ${interceptorName} missiles available for interception`);
    }
  
    await updateMissileCount(userId, interceptorName, -1);
  
    io.to(region).emit("interception_success", {
      region,
      missileName,
      interceptorName,
      result: "Interception successful",
    });
  };
  
