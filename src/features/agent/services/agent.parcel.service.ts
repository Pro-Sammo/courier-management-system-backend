import { Request } from "express";
import AbstractServices from "../../../abstract/abstract.service";
import {
  CLIENT_URL,
  PARCEL_STATUS,
  PROJECT_NAME,
} from "../../../utils/miscellaneous/constants";
import Lib from "../../../utils/lib/lib";
import { sendParcelUpdateEmail } from "../../../utils/templates/sendParcelUpdateEmail";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import config from "../../../app/config";
dayjs.extend(utc);
dayjs.extend(timezone);

export class AgentParcelService extends AbstractServices {
  public async getAssignedParcels(req: Request) {
    const { id } = req.agent;
    const { status } = req.query as unknown as { status: string };

    const parcelModel = this.Model.ParcelModel();

    const data = await parcelModel.getAssignedParcelList({
      agent_id: id,
      status,
    });

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.HTTP_OK,
      data: data || [],
    };
  }

  public async updateParcelStatus(req: Request) {
    const { id: agent_id } = req.agent;
    const { id: parcel_id } = req.params;
    const { status, agent_note } = req.body as unknown as {
      status: "PICKED UP" | "IN TRANSIT" | "DELIVERED" | "FAILED";
      agent_note: string;
    };

    const parcelModel = this.Model.ParcelModel();

    const parcel = await parcelModel.getAgentSingelParcel({
      parcel_id: Number(parcel_id),
      agent_id: agent_id,
    });

    if (!parcel) {
      return {
        success: false,
        code: this.StatusCode.HTTP_NOT_FOUND,
        message: this.ResMsg.HTTP_NOT_FOUND,
      };
    }

    let note = "";
    if (agent_note) {
      note = agent_note;
    } else {
      if (status === PARCEL_STATUS.PICKED_UP) {
        note = "Your parcel has been picked up from the sender.";
      } else if (status === PARCEL_STATUS.IN_TRANSIT) {
        note = "Your shipment is currently on its way to the destination.";
      } else if (status === PARCEL_STATUS.DELIVERED) {
        note = "Your parcel has been delivered.";
      } else if (status === PARCEL_STATUS.FAILED) {
        note = "The shipment couldn't be completed — please contact support.";
      }
    }

    await parcelModel.changeParcelStatus({
      parcel_id: Number(parcel_id),
      status,
    });

    await parcelModel.setParcelStatusLogs({
      parcel_id: Number(parcel_id),
      status,
      note,
      updated_at: new Date(),
      updated_by: req.agent.id,
    });

    if (status === PARCEL_STATUS.DELIVERED) {
      await parcelModel.setParcelPaymentStatus({
        parcel_id: Number(parcel_id),
        is_paid: true,
      });
    } else if (
      status === PARCEL_STATUS.FAILED &&
      parcel.payment_mode === "prepaid"
    ) {
      await parcelModel.setParcelPaymentStatus({
        parcel_id: Number(parcel_id),
        is_paid: false,
      });
    }

    req.io.emit("updateParcelStatus", { parcel_id, status });

    const userModel = this.Model.UserModel();
    const customer = await userModel.getProfileDetails({ id: parcel.user_id });

    const currentTime = dayjs().format("ddd, DD MMM YYYY hh:mm A");

    await Lib.sendEmail({
      email: customer[0].email,
      emailBody: sendParcelUpdateEmail({
        customerName: customer[0].name,
        trackingId: parcel.tracking_id,
        updatedAt: currentTime,
        updateMessage: note,
        trackingLink: `${CLIENT_URL}/customer/track/${parcel.tracking_id}`,
      }),
      emailSub: `${PROJECT_NAME} - ${note} | ${parcel.tracking_id}`,
    });

    return {
      success: true,
      code: this.StatusCode.HTTP_OK,
      message: this.ResMsg.HTTP_OK,
    };
  }
}
