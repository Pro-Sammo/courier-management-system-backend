import AbstractRouter from "../../../abstract/abstract.router";
import { AgentParcelController } from "../controller/agent.parcel.controller";

class AgentParcelRouter extends AbstractRouter {
  private controller = new AgentParcelController();

  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
   
    this.router
      .route("/")
      .get(this.controller.getAssignedParcels)
      
    this.router.route("/update-status/:id").post(this.controller.updateParcelStatus);
  }
}

export default AgentParcelRouter;
