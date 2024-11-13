import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Missile, User } from "../models/UsersModel"; 
import { ResponseStructure } from "../types/types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { loginService, registerService } from "../services/authService";



dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {username,password,organization} = req.body;
    const registeredUser = await registerService(username,password,organization);
   res.status(201).json(new ResponseStructure(true, registeredUser));
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!JWT_SECRET) {
      throw new Error("Something is wrong with jwt");
    }
    const { username, password } = req.body;
    const user = await loginService(username, password);
    if (!user) {
      res.status(401).json(new ResponseStructure(false, "user not found"));
      return;
    }
    const token = jwt.sign({ _id: user._id,organization:user.organization }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({data:user ,token });
  } catch (error) {
    next();
  }
}

export const getUserByToken = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId:any = req.user._id; 
        const user = await User.findById(userId).select("-password"); 
        
        if (!user) {
             res.status(404).json(new ResponseStructure(false, "User not found"));
             return
        }
        
        res.status(200).json(new ResponseStructure(true, user));
    } catch (error) {
        next();
    }
};

// const data =
//     [
//         {
//           "name": "Iron Dome",
//           "description": "A mobile all-weather air defense system designed to intercept and destroy short-range rockets and artillery shells.",
//           "speed": 3,
//           "intercepts": ["Qassam", "M-75", "Fajr-5", "Zelzal-2"],
//           "price": 50000
//         },
//         {
//           "name": "David's Sling",
//           "description": "A mid-to-long range air defense system capable of intercepting large caliber rockets and short-range ballistic missiles.",
//           "speed": 4,
//           "intercepts": ["Shahab-3", "Fateh-110", "Quds-1"],
//           "price": 80000
//         },
//         {
//           "name": "Patriot",
//           "description": "A long-range air defense system that intercepts tactical ballistic missiles, cruise missiles, and advanced aircraft.",
//           "speed": 5,
//           "intercepts": ["Shahab-3", "Zelzal-2"],
//           "price": 100000
//         },
//         {
//           "name": "Arrow",
//           "description": "A family of anti-ballistic missiles designed to intercept and destroy incoming missile threats at high altitudes.",
//           "speed": 5,
//           "intercepts": ["Shahab-3", "Fateh-110"],
//           "price": 120000
//         },
//         {
//           "name": "Qassam",
//           "description": "A simple, locally made rocket used by militant groups for attacks at relatively short distances.",
//           "speed": 12,
//           "intercepts": [],
//           "price": 5000
//         },
//         {
//           "name": "M-75",
//           "description": "A medium-range rocket used by armed groups to target areas beyond the immediate borders.",
//           "speed": 13,
//           "intercepts": [],
//           "price": 15000
//         },
//         {
//           "name": "Fajr-5",
//           "description": "A long-range rocket used for targeting urban centers and military installations.",
//           "speed": 14,
//           "intercepts": [],
//           "price": 30000
//         },
//         {
//           "name": "Zelzal-2",
//           "description": "A heavy artillery rocket designed for long-distance bombardment with significant explosive power.",
//           "speed": 15,
//           "intercepts": [],
//           "price": 45000
//         },
//         {
//           "name": "Shahab-3",
//           "description": "A medium-range ballistic missile developed for strategic strikes, capable of targeting distant locations.",
//           "speed": 15,
//           "intercepts": [],
//           "price": 70000
//         },
//         {
//           "name": "Fateh-110",
//           "description": "A short-range ballistic missile with precision targeting capabilities.",
//           "speed": 14,
//           "intercepts": [],
//           "price": 60000
//         },
//         {
//           "name": "Badr-1",
//           "description": "A short-range ballistic missile used by the Houthis for regional attacks.",
//           "speed": 13,
//           "intercepts": [],
//           "price": 20000
//         },
//         {
//           "name": "Quds-1",
//           "description": "A cruise missile developed by regional forces for longer-range precision attacks.",
//           "speed": 14,
//           "intercepts": [],
//           "price": 40000
//         }
        
// ]


  

// export const insertMissiles = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const insertedMissiles = await Missile.insertMany(data);
  
//       res.status(200).json({
//         success: true,
//         message: 'Missiles inserted successfully',
//         data: insertedMissiles,
//       });
//     } catch (error) {
//       next(error); 
//     }
//   };