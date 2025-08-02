import AbstractRouter from "../../../abstract/abstract.router";
import AgentProfileController from "../controller/agent.profile.controller";

class AgentProfileRouter extends AbstractRouter {
  private controller = new AgentProfileController();

  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
   
    this.router
      .route("/")
      .get(this.controller.getProfile)
  }
}

export default AgentProfileRouter;
