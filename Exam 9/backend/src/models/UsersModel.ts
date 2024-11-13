import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  organization: mongoose.Types.ObjectId;
}

export interface IOrganization extends Document {
  name: string;
  budget: number;
  resources: IResource[];
}

interface IResource extends Document {
  name: string;
  amount: number;
}

interface IMissile extends Document {
  name: string;
  description: string;
  speed: number;
  price: number;
  intercepts: string[];
}

const ResourceSchema = new Schema<IResource>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

const OrganizationSchema = new Schema<IOrganization>({
  name: { type: String, unique: true, required: true },
  budget: { type: Number, required: true },
  resources: [ResourceSchema],
});

const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
});

const MissileSchema = new Schema<IMissile>({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  speed: { type: Number, required: true },
  price: { type: Number, required: true },
  intercepts: [{ type: String }],
});

const User = mongoose.model<IUser>('User', UserSchema);
const Organization = mongoose.model<IOrganization>('Organization', OrganizationSchema);
const Missile = mongoose.model<IMissile>('Missile', MissileSchema);

export { User, Organization, Missile   };
