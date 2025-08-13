
import { Types } from "mongoose";

export enum Role{
    USER = "USER",
    ADMIN = "ADMIN",
    AGENT = "AGENT"
}

export interface  IAuthProvider {
    provider: "google" | "credentials" ;
    providerId: string;
}

export enum isActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED",
    DELETED = "DELETED"
}



export interface IUser {
    _id?:Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: string;
    isActive?: isActive;
    isVerified?: boolean;
    role?: Role;
    balance:number;
    auths:IAuthProvider[]
    booking ?:Types.ObjectId[]
    agents ? :Types.ObjectId[]
    agentApproved?: boolean; // for agents
    createdAt?: Date
}