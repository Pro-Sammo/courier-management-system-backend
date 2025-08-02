import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import { AdminParcelService } from "../services/admin.parcel.service";
import { AdminParcelValidator } from "../utils/validator/admin.parcel.validator";

export class AdminParcelController extends AbstractController {

    private service = new AdminParcelService()
    private validator = new AdminParcelValidator()


  public getAdminPacelList = this.asyncWrapper.wrap(
    {
      querySchema: this.validator.getAdminPacelListQueryValidator
    },
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.getAdminPacelList(req);
      res.status(code).json(data);
    }
  );



  public assignAgentToParcel = this.asyncWrapper.wrap(
    {
      bodySchema: this.validator.assignAgentToParcelValidator
    },
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.assignAgentToParcel(req);
      res.status(code).json(data);
    }
  );


  public changeParcelStatus = this.asyncWrapper.wrap(
    {
      bodySchema: this.validator.changeParcelStatusValidator
    },
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.changeParcelStatus(req);
      res.status(code).json(data);
    }
  );

}
