import { Server } from "socket.io";
import { getMissileCount, updateMissileCount } from "../utils/missileUtils";
import { Missile, User } from "../models/UsersModel";

export const interceptMissile = async (
  io: Server,
  userId: string,
  region: string,
  missileName: string,
  interceptorName: string
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  
  const missile = await Missile.findOne({ name: missileName });
  const interceptor = await Missile.findOne({ name: interceptorName });
  
  if (!missile || !interceptor) throw new Error("Missile or Interceptor not found");
 
  const missileCount = await getMissileCount(userId, interceptorName);
  if (missileCount <= 0) throw new Error(`No ${interceptorName} `);

  const timeToImpact = missile.speed; 
  const interceptorTime = interceptor.speed; 

  if (interceptorTime <= timeToImpact) {
    await updateMissileCount(userId, interceptorName, -1);
    io.to(region).emit("interception_success", {
      region,
      missileName,
      interceptorName,
      result: "Interception successful",
    });
  } else {
    io.to(region).emit("interception_failed", {
      region,
      missileName,
      interceptorName,
      result: "Interception failed: Insufficient time",
    });
  }
};

