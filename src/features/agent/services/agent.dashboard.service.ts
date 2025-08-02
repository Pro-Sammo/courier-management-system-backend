import { Request } from "express";
import AbstractServices from "../../../abstract/abstract.service";

export class AgentDashboardService extends AbstractServices {
  public async getDashboardData(req: Request) {
    const { id } = req.agent;
    const parcelModel = this.Model.ParcelModel();
    const data = await parcelModel.getDashboardDataForAgent(id);
    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.HTTP_OK,
      data,
    };
  }
}
