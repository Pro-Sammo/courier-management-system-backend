import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import { CustomarDashboardService } from "../services/customer.dashboard.service";

export class CustomerDashboardController extends AbstractController {
  private service = new CustomarDashboardService();

  public getDashboardData = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {
      const { code, ...rest } = await this.service.getDashboardData(req);

      res.status(code).json(rest);
    }
  );
}
