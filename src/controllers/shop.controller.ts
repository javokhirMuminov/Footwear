import { T } from "../libs/types/common";
import {Request, Response} from "express";
import MemberService  from "../models/Member.service";



const shopController: T = {};
shopController.goHome = (req:Request, res: Response) => {
 try {
  console.log("goHome");
  res.send("Home Page");
  //send | json | end | render | redirect

 }catch (err) {
  console.log("Error, goHome", err);
 }
}

shopController.getLogin = (req:Request, res: Response) => {
  try {
    console.log("getLogin");
   res.send("Login Page");

  }catch (err) {
   console.log("Error, getLogin", err);
  }
 }

 shopController.processLogin = (req:Request, res: Response) => {
  try {
    console.log("processLogin");

   res.send("processLogin  Page");

  }catch (err) {
   console.log("Error, processLogin", err);
  }
 }


 shopController.getSignup = (req:Request, res: Response) => {
  try {
    console.log("getSignup");

   res.send("Signup  Page");

  }catch (err) {
   console.log("Error, getSignup", err);
  }
 }

 shopController.processSignup = (req:Request, res: Response) => {
  try {
    console.log("processSignup");

   res.send("processSignup  Page");

  }catch (err) {
   console.log("Error, processSignup", err);
  }
 }

 export default shopController;