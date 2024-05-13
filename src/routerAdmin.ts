import express from "express";
const routerAdmin = express.Router();
import shopController from "./controllers/shop.controller";

/**Shoping */
routerAdmin.get('/', shopController.goHome);

routerAdmin.get("/login", shopController.getLogin);
routerAdmin.post("/login", shopController.proccessLogin);

routerAdmin.get("/signup", shopController.getSignup);
routerAdmin.post("/signup", shopController.proccessSignup);
routerAdmin.get("/logout", shopController.logout);


/***ShopingProduct */



/**User */

export default routerAdmin;
