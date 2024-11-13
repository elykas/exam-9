import { Server } from "socket.io";
import {  getMissileCount, updateMissileCount } from "../utils/missileUtils";
import { Missile } from "../models/UsersModel";

export const launchMissile = async (
    io: Server,
    userId: string,
    region: string,
    missileName: string
  ) => {
    const missileCount = await getMissileCount(userId, missileName);
    if (missileCount <= 0) {
      throw new Error(`No ${missileName} missiles available `);
    }
  
    await updateMissileCount(userId, missileName, -1);
    
    io.to(region).emit("missile_launched", { region, missileName });

    const missile = await Missile.findOne({name:missileName})
  
    const HitTime = missile?.speed;
    if(!HitTime){
        return
    }
    setTimeout(() => {
      io.to(region).emit("missile_hit", { region, missileName });
    }, HitTime * 1000);
  };