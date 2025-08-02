import AbstractRouter from "../../../abstract/abstract.router";
import { CustomerParcelController } from "../controller/customer.parcel.controller";

export class CustomerParcelRouter extends AbstractRouter {
  private controller = new CustomerParcelController();
  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    this.router
      .route("/")
      .post(this.controller.createParcel)
      .get(this.controller.getParcelList);


    this.router.route("/track/:tracking_id").get(this.controller.trackParcel);

    this.router.route("/:id").get(this.controller.getSingleParcel);
  }
}
