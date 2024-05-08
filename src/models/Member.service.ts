
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member, MemberInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";

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
    try {
      const result =  await this.memberModel.create(input);
    result.memberPassword = "";
    return result;
    }catch(err){
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }

  }

}

export default MemberService;