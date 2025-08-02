import { Router } from "express";
import AgentProfileRouter from "./router/agent.profile.router";
import AgentParcelRouter from "./router/agent.parcel.router";
import { AgentDashboardRouter } from "./router/agent.dashboard.router";

export default class AgentRootRouter {
  public Router = Router();
  private agentProfileRouter = new AgentProfileRouter();
  private agentParcelRouter = new AgentParcelRouter();
  private agentDashboardRouter = new AgentDashboardRouter();

  constructor() {
    this.callRouter();
  }

  private callRouter() {
    //profile router
    this.Router.use("/profile", this.agentProfileRouter.router);

    //agent router
    this.Router.use("/parcel", this.agentParcelRouter.router);

    //dashboard router
    this.Router.use("/dashboard", this.agentDashboardRouter.router);
  }
}
