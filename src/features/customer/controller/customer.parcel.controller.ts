import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import { CustomerParcelService } from "../services/customer.parcel.service";
import { CustomerParcelValidator } from "../utils/validator/customer.parcel.validator";

export class CustomerParcelController extends AbstractController{
    private service = new CustomerParcelService()
    private validator = new CustomerParcelValidator()
    constructor() {
        super();
    }


    public createParcel = this.asyncWrapper.wrap(
      {
        bodySchema: this.validator.createParcelValidator
      },
      async (req: Request, res: Response) => {
        const { code, ...data } = await this.service.createParcel(req);
        res.status(code).json(data);
      }
    );



    public getParcelList = this.asyncWrapper.wrap(
      {
        querySchema: this.validator.getParcelListQueryValidator
      },
      async (req: Request, res: Response) => {
        const { code, ...data } = await this.service.getParcelList(req);
        res.status(code).json(data);
      }
    );



    public getSingleParcel = this.asyncWrapper.wrap(
      {
        paramSchema:this.validator.getSingleParcelValidator
      },
      async (req: Request, res: Response) => {
        const { code, ...data } = await this.service.getSingleParcel(req);
        res.status(code).json(data);
      }
    );


    public trackParcel = this.asyncWrapper.wrap(
      {
        paramSchema:this.validator.getSingleParcelByTrackingIdValidator
      },
      async (req: Request, res: Response) => {
        const { code, ...data } = await this.service.trackParcel(req);
        res.status(code).json(data);
      }
    );
}