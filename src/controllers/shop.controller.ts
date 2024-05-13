import { T } from "../libs/types/common";
import {Request, Response} from "express";
import MemberService  from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import { Message } from "../libs/Errors";


const memberService = new MemberService();


const shopController: T = {};
shopController.goHome = (req:Request, res: Response) => {
 try {
  console.log("goHome");
  res.render("home");
  //send | json | end | render | redirect

 }catch (err) {
  console.log("Error, goHome", err);
  res.redirect("/admin");

 }
}

shopController.getSignup = (req:Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("login");



  }catch (err) {
   console.log("Error, getSignup", err);
   res.redirect("/admin");

  }
 }

shopController.getLogin = (req:Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");

  }catch (err) {
   console.log("Error, getLogin", err);
   res.redirect("/admin");
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
    console.log("Error, processSignup:", err);
    const message = err instanceof Error ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(`<script> alert("${message}); window.location.replace('/admin/signup) </script>`);
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
    console.log("Error, processLogin:", err);
    const message = err instanceof Error ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(`<script> alert("${message}); window.location.replace('admin/login) </script>`);

  }
 }


 shopController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function () {
      res.redirect("/admin");//redirect bu boshqa linkga yuborish
    })
  }catch (err) {
   console.log("Error, processLogin", err);
   res.redirect("/admin");//redirect bu boshqa linkga yuborish

  }
 }







 export default shopController;