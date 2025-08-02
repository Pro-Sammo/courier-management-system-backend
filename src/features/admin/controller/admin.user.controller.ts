import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import { AdminUserService } from "../services/admin.user.service";
import { AdminUserValidator } from "../utils/validator/admin.user.validator";

export class AdminUserController extends AbstractController {
  private service = new AdminUserService();
  private validator = new AdminUserValidator();

  public getAllUserList = this.asyncWrapper.wrap(
    {
      querySchema: this.validator.getAllUserListQueryValidator,
    },
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.getAllUserList(req);
      res.status(code).json(data);
    }
  );

  public updateUserRole = this.asyncWrapper.wrap(
    {
      bodySchema: this.validator.updateUserRoleValidator,
    },
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.updateUserRole(req);
      res.status(code).json(data);
    }
  );
}
