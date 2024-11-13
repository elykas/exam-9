import { IUser, Missile ,User} from "../models/UsersModel"; 
import bcrypt from "bcrypt";

export const registerService = async (username: string,password:string,organization:string): Promise<IUser> => {
    if (!username || !password) {
      throw new Error("Email and password is required");
    }
  
    
    const IsUser = await User.findOne({username});
  
    if(IsUser){
      throw new Error("This username is already in use. Try another one.")
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser:IUser = await User.create({username,password: hashedPassword,organization})
    return newUser
  };
  
  export const loginService = async(username:string,password:string) =>{
    const user = await User.findOne({username});

    if(!user){
        throw new Error("user not found")
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("The password is incorrect")
    }
    return user;
}
