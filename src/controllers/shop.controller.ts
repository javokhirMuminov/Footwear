import { T } from "../libs/types/common";
import {Request, Response} from "express";
import MemberService  from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";


const memberService = new MemberService();


const shopController: T = {};
shopController.goHome = (req:Request, res: Response) => {
 try {
  console.log("goHome");
  res.render("home");
  //send | json | end | render | redirect

 }catch (err) {
  console.log("Error, goHome", err);
 }
}

shopController.getSignup = (req:Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("login");



  }catch (err) {
   console.log("Error, getSignup", err);
  }
 }

shopController.getLogin = (req:Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");

  }catch (err) {
   console.log("Error, getLogin", err);
  }
 }




 shopController.proccessSignup = async (req:AdminRequest, res: Response) => {
  try {
    console.log("processSignup");

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.SHOP;

    const result =  await memberService.proccessSignup(newMember);

    //SESSION AUTHENTICATION
    req.session.member = result;
    req.session.save(function() {
      res.send(result);
    });//Buyerda biz sessinimizni ichiga requestni borib joylashini aytyapmiz
  }catch (err) {
   console.log("Error, processSignup", err);
   res.send(err);
  }
 }


 shopController.proccessLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");
    console.log(req.body);
    const input:LoginInput = req.body;

    const result = await memberService.proccessLogin(input);
    req.session.member = result;
    req.session.save(function() {
      res.send(result);
    });


  }catch (err) {
   console.log("Error, processLogin", err);
   res.send(err);

  }
 }





 export default shopController;