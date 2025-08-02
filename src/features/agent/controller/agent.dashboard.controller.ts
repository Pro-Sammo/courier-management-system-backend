import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import { AgentDashboardService } from "../services/agent.dashboard.service";

export class AgentDashboardController extends AbstractController {
  private service = new AgentDashboardService();

  public getDashboardData = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.getDashboardData(req);
      res.status(code).json(data);
    }
  );
}
