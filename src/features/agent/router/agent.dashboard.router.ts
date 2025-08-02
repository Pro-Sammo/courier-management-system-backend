import AbstractRouter from "../../../abstract/abstract.router";
import { AgentDashboardController } from "../controller/agent.dashboard.controller";

export class AgentDashboardRouter extends AbstractRouter {
  private controller = new AgentDashboardController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    this.router.route("/").get(this.controller.getDashboardData);
  }
}
