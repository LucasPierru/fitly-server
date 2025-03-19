import * as express from "express";
import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface User {
      id: ObjectId;
      email: string;
    }
    export interface Request {
      user?: User;
    }
  }
}
