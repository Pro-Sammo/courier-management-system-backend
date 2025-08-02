import AbstractRouter from "../../../abstract/abstract.router";
import AdminProfileController from "../controller/admin.profile.controller";

class AdminProfileRouter extends AbstractRouter {
  private controller = new AdminProfileController();

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

export default AdminProfileRouter;
