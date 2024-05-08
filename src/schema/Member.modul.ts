import mongoose, {Schema} from "mongoose";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";

//Schema first & Code first
const memberSchema = new Schema ({

  memberType: {
    type: String,
    enum: MemberType,
    default: MemberType.USER
  },

  memberStatus: {
    type: String,
    enum: MemberStatus,
    default: MemberStatus.ACTIVE,
  },

  memberNick: {
    type: String,
    index:{unique: true, sparse: true},// buyerda agar shu nomli user bolsa uni databasega yozmaydi shunday qilsak.
    required: true,//required degani agar member ismi bolsa databasega yozma degan manoni beradi.
  },

  memberPhone: {
    type: String,
    index: {unique: true, sparse: true},
    required: true,
  },

  memberPassword: {
    type: String,
    select: false,// bunda select databasedagi passwordlarni olib bermasin degan manoda!
    required: true
  },

  memberAddress: {
    type: String,
  },

  memberDesc: {
    type: String,
  },

  memberImage: {
    type:String,
  },


  memberPoints: {
    type: Number,
    default: 0,
  },

}, {timestamps: true });   // updateAt, va createdAt larni kursatib beradi!

export default mongoose.model('Member', memberSchema);// buyerda boshqa joydan chaqirish uchunham export qilyapmiz!