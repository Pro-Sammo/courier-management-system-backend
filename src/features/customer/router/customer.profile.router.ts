import AbstractRouter from "../../../abstract/abstract.router";
import { CustomerProfileController } from "../controller/customer.profile.controller";

export class CustomerProfileRouter extends AbstractRouter {
  private controller = new CustomerProfileController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    this.router.route("/").get(this.controller.getUserProfile);
  }
}
