import ProductService from "../models/Product.service";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import {NextFunction, Request, Response} from "express";
import shopController from "./shop.controller";
import { AdminRequest } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";


const productService = new ProductService();

const productController: T = {};
/***SPA */


/***SSR */
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


 productController.createNewProducts = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");
    console.log("file", req.files);
    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: ProductInput = req.body;
    data.productImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });

    await productService.createNewProducts(data);

    res.send(
      `<script>alert("${"Sucessful creation!"}"); window.location.replace('/admin/product/all')</script>`
    );
  } catch (err) {
    console.log("Error, createNewProduct", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/product/all')</script>`
    );
  }
};


 productController.updateChosenProducts = async (req:Request, res: Response) => {
  try {
    console.log("updateChosenProducts");
    const id = req.params.id;

    const result = await productService.updateChosenProduct(id, req.body);

    res.status(HttpCode.OK).json({data: result});
  }catch (err) {
   console.log("updateChosenProducts", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
 }













export default productController;
