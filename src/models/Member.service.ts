
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import * as bcrypt from "bcryptjs";

class MemberService {
  private readonly memberModel;
  constructor() {
    this.memberModel = MemberModel;
  }


  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
    .findOne({memberType: MemberType.SHOP} )//Buyerda biz 1 ta oshhonadan boshqasi kirolmasin degan mantiq
    .exec();
    console.log("exist:", exist);
    if(exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const salt = await bcrypt.genSalt();
    input.memberPasword = await bcrypt.hash(input.memberPasword, salt);


    try {
    const result =  await this.memberModel.create(input);
    result.memberPassword = "";
    return result;
    }catch(err){
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }


  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel.findOne({
      memberNick: input.memberNick
    }, {memberNick: 1, memberPassword: 1}).exec();
    //buyerda agar findOne methodini ishlatsak majburish 2 chi elementni olish uchun 1ni quyamiz kerak bolmasa 0 ni quyamiz.


    if(!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    const isMatch = await bcrypt.compare(
      input.memberPassword, member.memberPassword);

    //const isMatch = input.memberPassword === member.memberPassword;




    if(!isMatch){
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASWORD);
    }

    const result = await this.memberModel.findById(member._id).exec();

    return result;
  }

}

export default MemberService;