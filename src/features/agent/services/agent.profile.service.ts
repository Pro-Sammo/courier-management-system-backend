import { Request } from "express";
import AbstractServices from "../../../abstract/abstract.service";

class AgentProfileService extends AbstractServices {
  // Get profile
  public async getProfile(req: Request) {
    const { id } = req.customer;

    const userModel = this.Model.UserModel();
    const userProfile = await userModel.getProfileDetails({ id });

    if (!userProfile.length) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    const { password, ...rest } = userProfile[0];

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.HTTP_OK,
      data: rest,
    };
  }
}

export default AgentProfileService;
