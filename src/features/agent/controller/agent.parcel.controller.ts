import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import { AgentParcelService } from "../services/agent.parcel.service";
import { AgentParcelValidator } from "../utils/validator/agent.parcel.validator";

export class AgentParcelController extends AbstractController {
  private service = new AgentParcelService();
  private validator = new AgentParcelValidator();

  public getAssignedParcels = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.getAssignedParcels(req);
      res.status(code).json(data);
    }
  );

  public updateParcelStatus = this.asyncWrapper.wrap(
    {
      bodySchema: this.validator.updateParcelStatusValidator,
      paramSchema: this.validator.updateParcelStatusParamValidator,
    },
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.updateParcelStatus(req);
      res.status(code).json(data);
    }
  );
}
