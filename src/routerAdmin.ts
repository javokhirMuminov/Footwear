import express from "express";
const routerAdmin = express.Router();
import shopController from "./controllers/shop.controller";
import productController from "./controllers/product.controller";

/**Shoping */
routerAdmin.get('/', shopController.goHome);

routerAdmin.get("/login", shopController.getLogin);
routerAdmin.post("/login", shopController.proccessLogin);

routerAdmin.get("/signup", shopController.getSignup);
routerAdmin.post("/signup", shopController.proccessSignup);
routerAdmin.get("/logout", shopController.logout);


/***ShopingProduct */
routerAdmin.get("/product/all",shopController.verifyShop, productController.getAllProducts);
routerAdmin.post("/product/create",shopController.verifyShop, productController.createNewProducts);
routerAdmin.post("/product/:id",shopController.verifyShop, productController.updateChosenProducts);






/**User */

export default routerAdmin;
