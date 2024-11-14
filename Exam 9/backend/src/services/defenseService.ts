import { Server } from "socket.io";
import { getMissileCount, updateMissileCount } from "../utils/missileUtils";
import { Missile, User } from "../models/UsersModel";

export const interceptMissile = async (
  io: Server,
  userId: string,
  region: string,
  missileName: string,
  interceptorName: string,
  remainingTime:number
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  
  const interceptor = await Missile.findOne({ name: interceptorName });
  
  if (!interceptor) throw new Error("Missile or Interceptor not found");
 
  const missileCount = await getMissileCount(userId, interceptorName);
  if (missileCount <= 0) throw new Error(`No ${interceptorName} left`);

  const interceptorTime = interceptor.speed; 

  const canIntercept = interceptor.intercepts.includes(missileName)

  if (interceptorTime > remainingTime && canIntercept ) {
    await updateMissileCount(userId, interceptorName, -1);
    io.to(region).emit("interception_success", {
      region,
      missileName,
      interceptorName,
    });
  } else {
    io.to(region).emit("interception_failed", {
      region,
      missileName,
      interceptorName,
    });
  }
};

