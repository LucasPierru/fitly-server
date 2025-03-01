import express from "express";
import { httpLogin, httpRegister, httpUpdatePassword } from "./auth.controller";
import passportMiddleware from "../../middleware/passportMiddleware";

const authRouter = express.Router();

authRouter.post("/login", httpLogin);
authRouter.post("/register", httpRegister);
authRouter.post("/create", passportMiddleware, httpUpdatePassword);

export default authRouter;
