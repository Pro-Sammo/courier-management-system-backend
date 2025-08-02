import AbstractRouter from "../../../abstract/abstract.router";
import { AdminDashboardController } from "../controller/admin.dashboard.controller";

export class AdminDashboardRouter extends AbstractRouter {
  private controller = new AdminDashboardController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    this.router.route("/").get(this.controller.getDashboradData);
  }
}
