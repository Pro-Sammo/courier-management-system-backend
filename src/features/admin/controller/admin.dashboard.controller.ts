import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import { AdminDashboardService } from "../services/admin.dashboard.service";

export class AdminDashboardController extends AbstractController {
  private service = new AdminDashboardService();

  public getDashboradData = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.getDashboradData(req);
      res.status(code).json(data);
    }
  );
}
