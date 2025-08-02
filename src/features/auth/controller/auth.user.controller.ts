import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import UserAuthService from "../services/auth.user.service";
import { UserValidator } from "../utils/validator/user.validator";

export default class UserAuthController extends AbstractController {
  private services = new UserAuthService();
  private validator = new UserValidator()
  

  constructor() {
    super();
  }

  //register
  public registration = this.asyncWrapper.wrap(
    { bodySchema: this.validator.registerValidator },
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.services.registerUser(
        req
      );
      res.status(code).json(data);
    }
  );


  public login = this.asyncWrapper.wrap(
    { bodySchema: this.validator.loginValidator },
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.services.loginUser(req);
      res.status(code).json(data);
    }
  );
}
