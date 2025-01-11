import express from "express";
import passportMiddleware from "../../middleware/passportMiddleware";
import { httpGetProfile, httpUpdateProfile } from "./profile.controller";

const profileRouter = express.Router();

profileRouter.get("/", passportMiddleware, httpGetProfile);
profileRouter.post("/update", passportMiddleware, httpUpdateProfile);

export default profileRouter;
