import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { IOrganization, Missile, Organization, User } from "../models/UsersModel"; 
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
    console.log(registeredUser);
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
    const organizationName :any= await Organization.findById(user.organization)
    if (!organizationName) {
        res.status(404).json(new ResponseStructure(false, "Organization not found"));
        return;
      }
    const token = jwt.sign({ _id: user._id,organization:organizationName.name }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({data:user ,token });
  } catch (error) {
    next();
  }
}

export const getUserByToken = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId:any = req.user._id; 
        const user = await User.findById(userId).select("-password").populate("organization");

        
        if (!user) {
             res.status(404).json(new ResponseStructure(false, "User not found"));
             return
        }
        
        res.status(200).json(new ResponseStructure(true, user));
    } catch (error) {
        next();
    }
};

const data =
    [
        {
          "name": "IDF - North",
          "resources": [
            {
              "name": "Iron Dome",
              "amount": 25
            },
            {
              "name": "David's Sling",
              "amount": 15
            }
          ],
          "budget": 8000000
        },
        {
          "name": "IDF - South",
          "resources": [
            {
              "name": "Iron Dome",
              "amount": 30
            },
            {
              "name": "Patriot",
              "amount": 20
            }
          ],
          "budget": 9000000
        },
        {
          "name": "IDF - Center",
          "resources": [
            {
              "name": "Iron Dome",
              "amount": 40
            },
            {
              "name": "Arrow",
              "amount": 10
            }
          ],
          "budget": 10000000
        },
        {
          "name": "IDF - West Bank",
          "resources": [
            {
              "name": "Iron Dome",
              "amount": 10
            }
          ],
          "budget": 7000000
        },
        {
          "name": "Hezbollah",
          "resources": [
            {
              "name": "Fajr-5",
              "amount": 20
            },
            {
              "name": "Zelzal-2",
              "amount": 10
            }
          ],
          "budget": 3000000
        },
        {
          "name": "Hamas",
          "resources": [
            {
              "name": "Qassam",
              "amount": 50
            },
            {
              "name": "M-75",
              "amount": 30
            }
          ],
          "budget": 2500000
        },
        {
          "name": "IRGC",
          "resources": [
            {
              "name": "Shahab-3",
              "amount": 15
            },
            {
              "name": "Fateh-110",
              "amount": 25
            }
          ],
          "budget": 4000000
        },
        {
          "name": "Houthis",
          "resources": [
            {
              "name": "Badr-1",
              "amount": 20
            },
            {
              "name": "Quds-1",
              "amount": 15
            }
          ],
          "budget": 2000000
        }
      ]





  

export const insertMissiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const insertedMissiles = await Organization.insertMany(data);
  
      res.status(200).json({
        success: true,
        message: 'Missiles inserted successfully',
        data: insertedMissiles,
      });
    } catch (error) {
      next(error); 
    }
  };