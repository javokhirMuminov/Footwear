import { MemberStatus, MemberType } from "../enums/member.enum";
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
  memberPasword: string;
  memberAddress?:string;
  memberDesc?:string;
  memberImage?:string;
  memberPointer?:number;
}