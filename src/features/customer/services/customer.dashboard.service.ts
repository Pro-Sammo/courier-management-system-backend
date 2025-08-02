import { Request } from "express";
import AbstractServices from "../../../abstract/abstract.service";

export class CustomarDashboardService extends AbstractServices{
    public async getDashboardData(req:Request){
        const {id} = req.customer;

        const parcelModel = this.Model.ParcelModel()
        const data = await parcelModel.getDashBoradDataForCustomer(id)

        return {
            success:true,
            code:this.StatusCode.HTTP_OK,
            message:this.ResMsg.HTTP_OK,
            data
        }
    }
}