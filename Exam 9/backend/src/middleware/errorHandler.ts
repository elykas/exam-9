import { Request, Response, NextFunction } from "express";
import {ResponseStructure} from "../types/types"

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(process.env.NODE_ENVIORMENT === "dev"){

    console.error(err.stack);
  }
  const response = new ResponseStructure(false,{},err.message||err)
  res.status(500).json(response);
};
