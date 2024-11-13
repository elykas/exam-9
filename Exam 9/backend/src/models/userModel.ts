import mongoose, { model, Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  isAdmin: boolean;
  hasVoted: boolean;
  votedFor: string | null;
}