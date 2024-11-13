import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

export const verifyTokenAttack = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined in the environment variables.");
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token missing" });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;

    if (
      decoded.organization !== "IDF - North" &&
      decoded.organization !== "IDF - South" &&
      decoded.organization !== "IDF - Center" &&
      decoded.organization !== "IDF - West Bank"
    ) {
      throw new Error("Invalid token: No defense ");
    }

    next();
  } catch (error: any) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const verifyTokenForDefense = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined in the environment variables.");
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access token missing" });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;

    if (
      decoded.organization === "IDF - North" ||
      decoded.organization === "IDF - South" ||
      decoded.organization === "IDF - Center" ||
      decoded.organization === "IDF - West Bank"
    ) {
      next();
    } else {
      throw new Error("Invalid token: No attack permission");
    }
  } catch (error: any) {
    res.status(403).json({ message: "Invalid token" });
  }
};
