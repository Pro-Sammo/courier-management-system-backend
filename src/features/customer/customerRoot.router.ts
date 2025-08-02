import { Router } from "express";
import { CustomerProfileRouter } from "./router/customer.profile.router";
import { CustomerParcelRouter } from "./router/customer.parcel.router";
import { CustomerDashboardRouter } from "./router/customer.dashboard.router";

export default class CustomerRootRouter {
  public Router = Router();
  private CustomerProfileRouter = new CustomerProfileRouter();
  private CustomerParcelRouter = new CustomerParcelRouter();
  private CustomerDashboardRouter = new CustomerDashboardRouter();

  constructor() {
    this.callRouter();
  }

  private callRouter() {
    // profile router
    this.Router.use("/profile", this.CustomerProfileRouter.router);

    // parcel router
    this.Router.use("/parcel", this.CustomerParcelRouter.router);

    //dashboard
    this.Router.use("/dashboard", this.CustomerDashboardRouter.router);
  }
}
