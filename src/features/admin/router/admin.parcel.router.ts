import AbstractRouter from "../../../abstract/abstract.router";
import { AdminParcelController } from "../controller/admin.parcel.controller";

export class AdminParcelRouter extends AbstractRouter {
  private controller = new AdminParcelController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    this.router.route("/").get(this.controller.getAdminPacelList);
    this.router
      .route("/assign-agent")
      .post(this.controller.assignAgentToParcel);
    this.router
      .route("/change-status")
      .post(this.controller.changeParcelStatus);
  }
}
