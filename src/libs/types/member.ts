import { Session } from "express-session";
import { MemberStatus, MemberType } from "../enums/member.enum";
import { Request } from "express";
import {ObjectId} from "mongoose";


export interface Member {
  _id: ObjectId;
  memberType:MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPasword?: string;
  memberAddress?:string;
  memberDesc?:string;
  memberImage?:string;
  memberPointer:number;
  createAd: Date;
  updatedAd: Date;
}




export interface MemberInput {
  memberType?:MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?:string;
  memberDesc?:string;
  memberImage?:string;
  memberPointer?:number;
}


export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}
export interface AdminRequest extends Request {
  member: Member,
  session: Session & { member: Member};
  file: Express.Multer.File;
  files: Express.Multer.File[];
}