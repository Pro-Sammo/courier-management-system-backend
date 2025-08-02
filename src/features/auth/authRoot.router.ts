import { Router } from "express";
import UserAuthRouter from "./router/auth.user.router";

export default class AuthRootRouter {
  private userAuthRouter = new UserAuthRouter();
  public AuthRouter = Router();
  constructor() {
    this.callRouter();
  }

  private callRouter() {
    this.AuthRouter.use("/user", this.userAuthRouter.router);
  }
}
