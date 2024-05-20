import { T } from "../libs/types/common";
import {NextFunction, Request, Response} from "express";
import MemberService  from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";


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
    const file = req.file;
    if(!file) throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path;
    newMember.memberType = MemberType.SHOP;

    const result =  await memberService.proccessSignup(newMember);

    //SESSION AUTHENTICATION
    req.session.member = result;
    req.session.save(function() {
      res.redirect("/admin/product/all");
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
      res.redirect("/admin/product/all");
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




shopController.verifyShop = (
  req: AdminRequest,
  res: Response,
 next: NextFunction
 ) => {

     if(req.session?.member?.memberType === MemberType.RESTAURANT) {
       req.member = req.session.member;
       next();//buyerda prosess quyilmasa qotib qoladi midel ver uchun next quyish shart bolmasa keyingi pagega utkazmaydi!
       console.log("parol togri")
       /*buyerdagi algaritim bizfa shu req ni ichida bizga kim kirib kelayotkanini aniqlashda ishlaydi*/
     }else {
      const message = Message.NOT_AUTHENTICATED;
        res.send (
        `<script> alert("${message}"); window.location.replace('/admin/login);</script>`
        );
        console.log("parol yuq")
     }
}


 export default shopController;