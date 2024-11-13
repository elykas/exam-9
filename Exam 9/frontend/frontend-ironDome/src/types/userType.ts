export interface IUser {
    username: string;
    password: string;
    organization: string;
  }

export type Status = "idle" | "pending" | "fulfilled" | "rejected"
