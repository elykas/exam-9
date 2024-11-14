import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { IOrganization, Missile, Organization, User } from "../models/UsersModel"; 
import { ResponseStructure } from "../types/types";
import dotenv from "dotenv";
import { launchMissile } from "../services/attackService";
import { Server } from "socket.io";




dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const launchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {userId,region,missileName} = req.body;
    
    const registeredUser = await launchMissile(userId,region,missileName);
    console.log(registeredUser);
   res.status(201).json(new ResponseStructure(true, registeredUser));
  } catch (error) {
    next(error);
  }
};