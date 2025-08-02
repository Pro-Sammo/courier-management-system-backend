import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import AgentProfileService from "../services/agent.profile.service";

class AgentProfileController extends AbstractController {
  private service = new AgentProfileService();

  constructor() {
    super();
  }

  //get profile
  public getProfile = this.asyncWrapper.wrap(
    null,
    async (req: Request, res: Response) => {
      const { code, ...data } = await this.service.getProfile(req);
      res.status(code).json(data);
    }
  );
}

export default AgentProfileController;
