import { Request } from "express";
import AbstractServices from "../../../abstract/abstract.service";

export class AdminUserService extends AbstractServices {
  public async getAllUserList(req: Request) {
    const { role, filter } = req.query as unknown as { role: string, filter: string };

    const userModel = this.Model.UserModel();

    const users = await userModel.getAllUserList({ role, filter });

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.HTTP_OK,
      data: users,
    };
  }

  public async updateUserRole(req: Request) {
    const { user_id, role } = req.body as unknown as {
      user_id: number;
      role: string;
    };

    const userModel = this.Model.UserModel();

    const check = await userModel.getProfileDetails({ id: user_id });

    if (!check.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

     await userModel.updateUserRole({ user_id, role });

    return {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: this.ResMsg.HTTP_SUCCESSFUL,
    };
  }
}
