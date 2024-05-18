import ProductService from "../models/Product.service";
import Errors from "../libs/Errors";
import { T } from "../libs/types/common";
import {NextFunction, Request, Response} from "express";
import shopController from "./shop.controller";
import { AdminRequest } from "../libs/types/member";


const productService = new ProductService();

const productController: T = {};


productController.getAllProducts = async (req:AdminRequest, res: Response) => {
  try {
    console.log("getAllProducts");
    res.render("products")

  }catch (err) {
   console.log("Error, signup", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
 }


 productController.createNewProducts = async (req:Request, res: Response) => {
  try {
    console.log("createNewProducts");


  }catch (err) {
   console.log("createNewProducts", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
 }


 productController.updateChosenProducts = async (req:Request, res: Response) => {
  try {
    console.log("updateChosenProducts");


  }catch (err) {
   console.log("updateChosenProducts", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
 }













export default productController;
