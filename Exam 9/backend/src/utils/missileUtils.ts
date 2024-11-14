import { IOrganization, Organization, User } from "../models/UsersModel";



export const getMissilesForOrganization = (organizationName: string) => {
    const organization = Organization.findOne({name: organizationName});
  
    if (!organization) {
      throw new Error(`Organization ${organizationName} not found`);
    }
  
    return organization;
  };


  export const updateMissileCount = async (
    userId: string,
    missileName: string,
    change: number
  ) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
  
    const organization = await Organization.findById(user.organization);
    if (!organization) {
      throw new Error("Organization not found");
    }
  
    const missile = organization.resources.find(
      (resource) => resource.name === missileName
    );
    
    if (!missile) {
      throw new Error(`Missile ${missileName} not found`);
    }
  
    if (missile.amount + change < 0) {
      throw new Error(`Not enough missile ${missileName}`);
    }
  
    missile.amount += change;
    await organization.save();
  };
  


  export const getMissileCount = async (
    userId: string,
    missileName: string
  ) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
  
    const organization = await Organization.findById(user.organization);
    if (!organization) {
      throw new Error("Organization not found");
    }
  
    const missile = organization.resources.find(
      (resource) => resource.name === missileName
    );
  
    return missile ? missile.amount : 0;
  };
  