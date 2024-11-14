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
    console.log(region);
    
    
    
    const missile = await Missile.findOne({name:missileName})
    
    const hitTime = missile?.speed;
    if(!hitTime){
        return
    }
    console.log(hitTime);
    
    let timeToHit = hitTime;
    io.to(region).emit("missile-launched", { region, missileName,timeToHit });
    
    const intervalId = setInterval(() => {
      if (timeToHit <= 0) {
        clearInterval(intervalId);
        io.to(region).emit("missile-hit", { region, missileName });
      } else {
        io.to(region).emit("missile-inAir", { region, missileName, timeToHit });
        timeToHit--;
      }
    }, 1000);
  };

   
  