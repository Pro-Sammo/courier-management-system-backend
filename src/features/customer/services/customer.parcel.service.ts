import { Request } from "express";
import AbstractServices from "../../../abstract/abstract.service";
import Lib from "../../../utils/lib/lib";

export class CustomerParcelService extends AbstractServices {
  constructor() {
    super();
  }

  public async createParcel(req: Request) {
    return this.db.transaction(async (trx) => {
      const { id } = req.customer;

      const paylaod = req.body;

      const tracking_id = await Lib.generateTrackingId({ trx });

      paylaod.customer_id = id;
      paylaod.tracking_id = tracking_id;

      const parcelModel = this.Model.ParcelModel(trx);

      const parcel = await parcelModel.createParcel(paylaod);
      await parcelModel.setParcelStatusLogs({
        parcel_id: parcel[0].id,
        status: "PENDING",
        updated_at: new Date(),
        note: "Your package is awaiting pickup.",
      });

      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        message: this.ResMsg.HTTP_SUCCESSFUL,
      };
    });
  }

  public async getParcelList(req: Request) {
    return this.db.transaction(async (trx) => {
      const { id } = req.customer;
      const { status, tracking_id, limit, skip } = req.query as unknown as {
        status: string;
        tracking_id: string;
        limit: number;
        skip: number;
      };

      const parcelModel = this.Model.ParcelModel(trx);

      const { data, total } = await parcelModel.getParcelList({
        status,
        tracking_id,
        customer_id: id,
        limit,
        skip,
      });

      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        message: this.ResMsg.HTTP_SUCCESSFUL,
        total: total || 0,
        data: data || [],
      };
    });
  }

  public async getSingleParcel(req: Request) {
    return this.db.transaction(async (trx) => {
      const { id } = req.customer;
      const { id: parcel_id } = req.params;

      const parcelModel = this.Model.ParcelModel(trx);

      const data = await parcelModel.getSingleParcel({
        parcel_id: Number(parcel_id),
        customer_id: id,
      });

      if (!data) {
        return {
          success: false,
          code: this.StatusCode.HTTP_NOT_FOUND,
          message: this.ResMsg.HTTP_NOT_FOUND,
        };
      }

      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        message: this.ResMsg.HTTP_SUCCESSFUL,
        data: data,
      };
    });
  }

  public async trackParcel(req: Request) {
    return this.db.transaction(async (trx) => {
      const { id } = req.customer;
      const { tracking_id } = req.params;

      const parcelModel = this.Model.ParcelModel(trx);

      const data = await parcelModel.getSingleParcelByTrackingId(
        tracking_id,
        id
      );

      if (!data) {
        return {
          success: false,
          code: this.StatusCode.HTTP_NOT_FOUND,
          message: this.ResMsg.HTTP_NOT_FOUND,
        };
      }

      const tracking = await parcelModel.trackParcel({
        parcel_id: Number(data.id),
      });

      return {
        success: true,
        code: this.StatusCode.HTTP_SUCCESSFUL,
        message: this.ResMsg.HTTP_SUCCESSFUL,
        data: {
          ...data,
          tracking: tracking,
        },
      };
    });
  }
}
