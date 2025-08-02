import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import { CustomerProfileService } from "../services/customer.profile.service";

export class CustomerProfileController extends AbstractController {
  private services = new CustomerProfileService();
  constructor() {
    super();
  }

  public getUserProfile = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.services.getUserProfile(req);
      res.status(code).json(data);
    }
  );
}
