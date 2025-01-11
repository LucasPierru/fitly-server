import * as express from "express";

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
    }
    export interface Request {
      user?: User;
    }
  }
}
