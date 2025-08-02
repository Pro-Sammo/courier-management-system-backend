import { Request } from "express";
import AbstractServices from "../../../abstract/abstract.service";

export class AdminDashboardService extends AbstractServices{


    public async getDashboradData(req: Request) {
        const parcelModel = this.Model.ParcelModel();
        const data = await parcelModel.getDashboradDataForAdmin();

        return{
            success:true,
            code: this.StatusCode.HTTP_OK,
            message: this.ResMsg.HTTP_OK,
            data
        }
    }
}