interface IResource {
    name: string;
    amount: number;
  }
  
  export interface IOrganization {
    _id: string;
    name: string;
    budget: number;
    resources: IResource[];
  }
  
  export interface IUser {
    username: string;
    password: string;
    organization: IOrganization;
  }

export type Status = "idle" | "pending" | "fulfilled" | "rejected"
