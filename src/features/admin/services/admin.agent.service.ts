import { Request } from "express";
import AbstractServices from "../../../abstract/abstract.service";
import { ROLE } from "../../../utils/miscellaneous/constants";

export class AdminAgentService extends AbstractServices {
  public async getAgentList(req: Request) {
    const userModel = this.Model.UserModel();

    const agents = await userModel.getAgentUserList({ role: ROLE.AGENT });

    return {
      success: true,
      code: this.StatusCode.HTTP_SUCCESSFUL,
      message: this.ResMsg.HTTP_SUCCESSFUL,
      data: agents,
    };
  }
}
