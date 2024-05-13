import { Router } from "express";
const router = Router();
import memberController from "./controllers/member.controller";


router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);



export default router;
