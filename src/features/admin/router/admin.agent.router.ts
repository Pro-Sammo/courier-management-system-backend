import AbstractRouter from "../../../abstract/abstract.router";
import { AdminAgentController } from "../controller/admin.agent.controller";

export class AdminAgentRouter extends AbstractRouter {
    private controller = new AdminAgentController()
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    this.router.route("/").get(this.controller.getAgentList)
  }
}
