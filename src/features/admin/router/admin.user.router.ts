import AbstractRouter from "../../../abstract/abstract.router";
import { AdminUserController } from "../controller/admin.user.controller";

export class AdminUserRouter extends AbstractRouter {
  private controller = new AdminUserController();

  constructor() {
    super();
    this.callRouter();
  }

  private callRouter() {
    this.router.route("/").get(this.controller.getAllUserList);
    this.router.route("/update-role").post(this.controller.updateUserRole);
  }
}
