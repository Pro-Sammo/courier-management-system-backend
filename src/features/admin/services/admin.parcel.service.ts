import { Request } from "express";
import AbstractServices from "../../../abstract/abstract.service";

export class AdminParcelService extends AbstractServices {
  public async getAdminPacelList(req: Request) {
    const { status, tracking_id, limit, skip } = req.query as unknown as {
      status: string;
      tracking_id: string;
      limit: number;
      skip: number;
    };

    const parcelModel = this.Model.ParcelModel();

    const { data, total } = await parcelModel.getAdminPacelList({
      status,
      tracking_id,
      limit,
      skip,
    });

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.HTTP_OK,
      total: total || 0,
      data: data || [],
    };
  }

  public async assignAgentToParcel(req: Request) {
    return this.db.transaction(async (trx) => {
      const { parcel_id, agent_id } = req.body as unknown as {
        parcel_id: number;
        agent_id: number;
      };

      const parcelModel = this.Model.ParcelModel(trx);
      const userModel = this.Model.UserModel(trx);

      const parcel = await parcelModel.getAdminSingleParcel({ parcel_id });

      if (!parcel) {
        return {
          success: false,
          code: this.StatusCode.HTTP_NOT_FOUND,
          message: this.ResMsg.HTTP_NOT_FOUND,
        };
      }

      const agent = await userModel.getProfileDetails({ id: agent_id });

      if (!agent) {
        return {
          success: false,
          code: this.StatusCode.HTTP_NOT_FOUND,
          message: this.ResMsg.HTTP_NOT_FOUND,
        };
      }

      await parcelModel.assignAgentToParcel({ parcel_id, agent_id });

      return {
        success: true,
        code: this.StatusCode.HTTP_OK,
        message: this.ResMsg.HTTP_OK,
      };
    });
  }

  public async changeParcelStatus(req: Request) {
    const { parcel_id, status } = req.body as unknown as {
      parcel_id: number;
      status: string;
    };

    console.log("called---------------->>")

    const parcelModel = this.Model.ParcelModel();

    const parcel = await parcelModel.getAdminSingleParcel({ parcel_id });

    if (!parcel) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    await parcelModel.changeParcelStatus({ parcel_id, status });


    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.HTTP_OK,
    };
  }
}
