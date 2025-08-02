import { Request, Response } from "express";
import AbstractController from "../../../abstract/abstract.controller";
import { AdminAgentService } from "../services/admin.agent.service";

export class AdminAgentController extends AbstractController{
    private service = new AdminAgentService();

    public getAgentList = this.asyncWrapper.wrap(
        null,
        async(req: Request, res: Response) => {
            const {code, ...data} = await this.service.getAgentList(req);
            res.status(code).json(data);
        }
    )
}